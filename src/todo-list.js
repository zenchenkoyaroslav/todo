import React, { Component } from 'react';

export default class TodoList extends Component {
    maxId = 4;
    state = {
        items : [
            {id: 1, text : "Todo"},
            {id: 2, text : "Todotodo"},
            {id: 3, text : "tododo"}
        ]
    }
    

    AddItem = (text) => {
        let newItem = {id: this.maxId++, text: text}

        this.setState( ({items}) => {
            let newItems = [
                ...this.state.items,
                newItem
            ]
            return {
                items : newItems
            }
        });
    }

    DeleteItem = (id) => {
        let items = this.state.items.slice();
        items.splice(items.findIndex(i => i.id === id), 1)
        this.setState({items})
    }

    render(){
        const newItems = this.state.items.map((it) => {
            return (
                <li key={it.id}>{it.text} <button type="button" onClick={() => this.DeleteItem(it.id)} value={it.id}>Delete</button></li>
            );
        });
        return (
            <div>
                <AddBar addItem={this.AddItem}/>
                <div>
                    <ul>
                        {newItems}
                    </ul>
                </div>
            </div>
        );
    }
}

class AddBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text : ""
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addItem(this.state.text);
    }

    onChange = (event) => {
        this.setState({text: event.target.value})
    }
    render(){
    return (
        <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="Todo" onChange={this.onChange}></input>
            <input type="submit"  value="Add"></input>
        </form>
    );
    }
}

