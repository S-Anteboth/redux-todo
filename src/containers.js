import {connect} from 'react-redux';
import {addTodo, deleteTodo, toggleTodo} from './actions';
import TodoList from './components/TodoList';
import {bindActionCreators} from 'redux';

function mapStateToProps(state) {
    return {
        todos: state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTodo,
        toggleTodo,
        deleteTodo
    }, dispatch);
}

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListContainer;