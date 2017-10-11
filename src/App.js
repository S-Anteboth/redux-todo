import React, {Component} from 'react';
import './App.css';
import reducer from './reducer';
import {createStore} from 'redux';
import TodoListContainer from './containers';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(reducer);

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <Provider store={store}>
                        <TodoListContainer/>
                    </Provider>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
