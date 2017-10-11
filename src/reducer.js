import {List} from 'immutable';
import fire from './fire';

const init = List([]);

export default function (todos = init, action) {
    switch (action.type) {

        case 'ADD_TODO':
            fire.database().ref('todos').push((action.payload));
            return todos;

        case 'TOGGLE_TODO':
            fire.database().ref('todos').child(action.payload.id).update({isDone: !action.payload.isDone});
            return todos;

        case 'DELETE_TODO':
            console.log("DELETE: " + action.payload);
            fire.database().ref('todos').child(action.payload).remove();
            return todos;

        default:
            return todos;
    }
}