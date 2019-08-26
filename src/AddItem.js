import React, { Component } from 'react';

class AddItem extends Component {
    render() {
        if (this.props.showAddItem) {
            return (
                <div style={{ marginLeft: '30%', marginRight: '30%', width: '40%', textAlign: "left" }}>
                    <div>
                        Work Item <input type="text" className="form-control" name="workItem" required value={this.props.workItem} onChange={this.props.changeText} />
                    </div>
                    <div>
                        Due Date <input type="date" className="form-control" name="dueDate" required value={this.props.dueDate} onChange={this.props.changeText} />
                    </div>
                    <div>
                        Resources <input type="number" className="form-control" name="resources" required value={this.props.resources} onChange={this.props.changeText} />
                    </div>
                    <br />
                    <div style={{ textAlign: "center" }}>
                        {!this.props.id && <button className="btn btn-success" onClick={this.props.create}>Create</button>}
                        {this.props.id && <button className="btn btn-success" onClick={this.props.update}>Update</button>}&nbsp;&nbsp;
                        {<button className="btn btn-warning" onClick={this.props.close}>Close</button>}
                    </div>
                </div>
            );
        }
        else
            return null;
    }
}

export default AddItem;
