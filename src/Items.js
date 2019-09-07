import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import AddItem from './AddItem';

export default class Items extends Component {
    constructor() {
        super();
        this.state = {
            showAddItem: 0,
            id: '',
            workItem: '',
            dueDate: '',
            resources: '',
            editId: undefined,
            items: []
        }
    }
    
    componentDidMount() {
        const items = localStorage.getItem("items");
        this.setState({ items: JSON.parse(items) });
    }

    changeText = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    createNewItem = () => {
        let item = {
            id: Math.floor(Math.random() * 100),
            workItem: this.state.workItem,
            dueDate: this.state.dueDate,
            resources: this.state.resources
        }
        const items = this.state.items.concat([item]);
        this.setState({
            items,
            showAddItem: 0,
            workItem: '',
            dueDate: '',
            resources: ''
        });
        localStorage.setItem("items", JSON.stringify(items));
    }

    editItem = (event) => {
        const editItem = this.state.items.find(item => parseInt(event.target.id) === item.id);
        this.setState({
            showAddItem: 1,
            workItem: editItem.workItem,
            dueDate: editItem.dueDate,
            resources: editItem.resources,
            editId: editItem.id
        });
    }

    updateItem = () => {
        let editItem = {
            id: this.state.editId,
            workItem: this.state.workItem,
            dueDate: this.state.dueDate,
            resources: this.state.resources
        }
        const items = this.state.items.map(item =>
            item.id === editItem.id ? editItem : item
        )
        this.setState({
            items,
            showAddItem: 0,
            workItem: '',
            dueDate: '',
            resources: '',
            editId: undefined
        });
        localStorage.setItem("items", JSON.stringify(items));
    }

    deleteItem = (event) => {
        if (window.confirm("are you sure want to delete")) {
            const items = this.state.items.filter(item => parseInt(event.target.id) !== item.id);
            this.setState({ items });
            localStorage.setItem("items", JSON.stringify(items));
        }
    }

    handleClose = () => {
        this.setState({ showAddItem: 0 });
    }

    showAddItemForm = () => {
        this.setState({ showAddItem: 1 });
    }

    render() {
        return (
            <div>
                <br />
                <Row>
                    <Col md={2}></Col>
                    <Col md={2}>
                        <h3>React Assignment</h3>
                    </Col>
                    <Col md={3}></Col>
                    <Col md={3}>
                        {/* <h4>Number of Work Items: {localStorage.getItem("workItems")}</h4> */}
                        {/* <h4>Number of Work Items: {this.state.items.length}</h4> */}
                    </Col>
                    <Col md={2}></Col>
                </Row>
                <br />
                <Row>
                    <Col md={5}></Col>
                    <Col md={2}>
                        <button className="btn btn-success" >Upload to Google Spread Sheet</button>
                    </Col>
                    <Col md={2}>
                        <button className="btn btn-success" onClick={this.showAddItemForm}>Add New Item</button>
                    </Col>
                    <Col md={3}></Col>
                </Row>
                <br /> 
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <table className="table" style={{border:'1px solid'}}>
                            <thead> 
                                <tr>
                                    <th style={{textAlign:"center"}}>Id</th>
                                    <th style={{textAlign:"center"}}>WorkItem</th>
                                    <th style={{textAlign:"center"}}>Due Date</th>
                                    <th style={{textAlign:"center"}}>Resources</th>
                                    <th style={{textAlign:"center"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.workItem}</td>
                                                <td>{item.dueDate}</td>
                                                <td>{item.resources}</td>
                                                <td>
                                                    <i className="fas fa-edit" id={item.id} onClick={this.editItem}></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <i className="fas fa-trash" id={item.id} onClick={this.deleteItem}></i>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </Col>
                    <Col md={3}></Col>
                </Row>
                
                <br />
                <AddItem
                    id={this.state.editId}
                    workItem={this.state.workItem}
                    dueDate={this.state.dueDate}
                    resources={this.state.resources}
                    showAddItem={this.state.showAddItem}
                    changeText={this.changeText}
                    create={this.createNewItem}
                    update={this.updateItem}
                    close={this.handleClose}
                />
            </div>
        );
    }
}
