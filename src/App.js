import React, {Component} from 'react';
import './App.css';
import reducer from './reducer';
import {createStore} from 'redux';
import TodoListContainer from './containers';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {auth, provider} from './fire';
import fire from "./fire";
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Col} from 'react-bootstrap';


const store = createStore(reducer);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            user: null
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            }
        });
        const itemsRef = fire.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    user: items[item].user
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    render() {

        const paperStyle = {
            height: 100,
            width: 250,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };

        return (
            <MuiThemeProvider>
                <div className="App">

                    <AppBar
                        title="Todo List"
                        iconElementLeft={
                            this.state.user ?

                                <Avatar
                                    size={50}
                                    src={this.state.user.photoURL}>
                                </Avatar>
                                :
                                null

                        }
                        iconElementRight={
                            this.state.user ?
                                <FlatButton label="Logout" onClick={this.logout}/>
                                :
                                <FlatButton label="Log In" onClick={this.login}/>
                        }
                    />


                    {this.state.user ?
                        <Provider store={store}>
                            <TodoListContainer/>
                        </Provider>
                        :

                        <Col md={4} mdOffset={4}>
                            <Paper style={paperStyle} zDepth={1}>
                                <div className='wrapper'>
                                    You must be logged in.
                                </div>
                            </Paper>
                        </Col>
                    }

                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
