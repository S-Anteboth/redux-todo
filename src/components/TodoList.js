import Todo from './Todo';
import TextField from 'material-ui/TextField';
import {List as MaterialList} from 'material-ui/List';
import {Col} from 'react-bootstrap';
import React, {Component} from 'react';
import {List} from 'immutable';
import fire from '../fire';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';

const TODO_FILTERS = {
    SHOW_ALL: () => true,
    SHOW_ACTIVE: todo => !todo.isDone,
    SHOW_COMPLETED: todo => todo.isDone
};


class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: List([]),
            selectedIndex: 0,
            filter: TODO_FILTERS.SHOW_ALL
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

    select(index) {
        this.setState({selectedIndex: index});
        switch (index) {
            case 0: {
                this.setState({filter: TODO_FILTERS.SHOW_ALL});
                break;
            }
            case 1: {
                this.setState({filter: TODO_FILTERS.SHOW_ACTIVE});
                break;
            }
            case 2: {
                this.setState({filter: TODO_FILTERS.SHOW_COMPLETED});
                break;
            }
            default: {
                this.setState({filter: TODO_FILTERS.SHOW_ALL});
                break;
            }
        }
    }


    render() {
        const {toggleTodo, addTodo, deleteTodo} = this.props;

        const onSubmit = (event) => {
            const input = event.target;
            const text = input.value;
            const isEnterKey = (event.which === 13);
            const isLongEnough = text.length > 0;

            if (isEnterKey && isLongEnough) {
                input.value = '';
                addTodo(text);
            }
        };

        const iconStyle = {
            marginRight: 24,
        };

        const bottomNavStyle = {
            bottom: 0,
            position: 'absolute'
        };


        return (
            <div>
                <Col md={4} mdOffset={4}>

                    <TextField
                        fullWidth={true}
                        floatingLabelText="Add todo"
                        onKeyDown={onSubmit}/>


                    <div className="list">
                        <MaterialList>
                            {this.state.items.filter(this.state.filter).map(item => (
                                <Todo key={item.id} todo={item} toggleTodo={toggleTodo}
                                      deleteTodo={deleteTodo}/>
                            ))}

                        </MaterialList>
                    </div>
                    <img src="./bottom-tear.svg" className="bottom-tear" alt=""/>

                </Col>

                <BottomNavigation selectedIndex={this.state.selectedIndex} style={bottomNavStyle}>
                    <BottomNavigationItem
                        label="All"
                        icon={<ActionList style={iconStyle}/>}
                        onClick={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Active"
                        icon={<ActionAlarm style={iconStyle}/>}
                        onClick={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label="Done"
                        icon={<ActionDone style={iconStyle}/>}
                        onClick={() => this.select(2)}
                    />
                </BottomNavigation>
            </div>
        )
    }
}

export default TodoList;