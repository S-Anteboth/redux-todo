import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';
import {ListItem} from 'material-ui/List';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

class Todo extends Component {


    render() {
        const {todo, toggleTodo, deleteTodo} = this.props;

        const
            handleDoneStyle = (isDone) => {
                if (isDone) {
                    return {color: "#aaaaaa", textDecoration: "line-through"};
                }
            };

        return (

            <div>
                <ListItem
                    style={handleDoneStyle(todo.isDone)}
                    primaryText={todo.text}
                    leftCheckbox={<Checkbox
                        checked={todo.isDone}
                        onCheck={() => toggleTodo(todo)}
                    />}

                    rightIconButton={
                        <IconButton
                            onClick={() => deleteTodo(todo.id)}>
                            <ActionDeleteForever/>
                        </IconButton>
                    }

                />
                <Divider/>
            </div>
        )
    }
}

export default Todo;