// hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);


export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        payload: {
            id: uid(),
            isDone: false,
            text: text
        }
    };
}

export function toggleTodo(todo) {
    return {
        type: 'TOGGLE_TODO',
        payload: todo
    }
}

export function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        payload: id
    }
}
