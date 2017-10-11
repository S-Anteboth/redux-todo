import Todo from './Todo';
import TextField from 'material-ui/TextField';
import {List as MaterialList, ListItem} from 'material-ui/List';
import {Col} from 'react-bootstrap';
import React, {Component} from 'react';
import {List} from 'immutable';
import fire from '../fire';

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: List([])
        };
    }

    componentWillMount() {
        const itemsRef = fire.database().ref('todos').orderByKey().limitToLast(100);
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                console.log("item: " + items[item]);
                newState.push({
                    id: item,
                    text: items[item].text,
                    isDone: items[item].isDone
                });
            }
            this.setState({
                items: newState
            });

        });
    }


    render() {
        const {toggleTodo, addTodo, deleteTodo} = this.props;

        const onSubmit = (event) => {
            const input = event.target;
            const text = input.value;
            const isEnterKey = (event.which == 13);
            const isLongEnough = text.length > 0;

            if (isEnterKey && isLongEnough) {
                input.value = '';
                addTodo(text);
            }
        };


        return (
            <Col md={4} mdOffset={4}>

                <TextField
                    fullWidth={true}
                    floatingLabelText="Add todo"
                    onKeyDown={onSubmit}/>


                <div className="list">
                    <MaterialList>
                        {this.state.items.map(item => (
                            <Todo key={item.id} todo={item} toggleTodo={toggleTodo}
                                  deleteTodo={deleteTodo}/>
                        ))}

                    </MaterialList>
                </div>
                <img src="./bottom-tear.svg" className="bottom-tear"/>

            </Col>
        )
    }
}

export default TodoList;