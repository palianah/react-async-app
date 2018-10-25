import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

import InputItem from './Components/InputItem';
import UserData from './Components/UserData';
import CommentList from './Components/CommentList';

export default class App extends Component {
    /**
     * constructor for declaring state and stuff
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            error: null,
            id: 1,
            userData: {},
            userComments: []
        };

        // bind handleInputChange to use this
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * if app did mount, send request
     */
    componentDidMount() {
        this.sendAxiosRequest();
    }

    /**
     * prepare axios request and send for user & comments api
     */
    sendAxiosRequest() {
        // define default user for requests
        let userUrl = `https://jsonplaceholder.typicode.com/users/${this.state.id}`;
        let commentsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${this.state.id}`;

        // request for user Data
        axios.get(userUrl)
            .then(res => {
                this.handleAxiosRequest(res, "user");
            })
            .catch(error => {
                // handle error
                this.setState({
                    isLoading: false,
                    error: {
                        message: `error in user async request: ${error}`
                    }
                });
                this.resetData();
                console.error('error in user async request: ', error);
            });

        // request for user Comments
        axios.get(commentsUrl)
            .then(res => {
                this.handleAxiosRequest(res, "comments");
            })
            .catch(error => {
                // handle error
                this.setState({
                    isLoading: false,
                    error: {
                        message: `error in comments async request: ${error}`
                    }
                });
                this.resetData();
                console.error('error in comments async request: ', error);
            });
    }

    /**
     * reset state data on error
     */
    resetData() {
        this.setState({
            userData: {},
            userComments: []
        });
    }

    /**
     * Method for Request Response, checks for type if user or comments response
     * @param res
     * @param type
     */
    handleAxiosRequest(res, type) {
        if(!type || !res) return;

        // check if result is returned successfully
        if(res !== 'undefined' && typeof res === "object" && res.data) {
            switch (type) {
                case "user":
                    this.setState({
                        userData: {
                            name: res.data.name,
                            username: res.data.username,
                            email: res.data.email,
                            address: res.data.adress
                        },
                        error: null,
                        isLoading: false
                    });
                    break;

                case "comments":
                    this.setState({
                        userComments: res.data,
                        isLoading: false,
                        error: null
                    });
                    break;
                default:
                    this.setState({
                        isLoading: false,
                        error: {
                            message: "type is not correctly set, please provide a valid type"
                        }
                    });
                    console.error('type is not correctly set, please provide a valid type');
            }
        }else {
            // error handling
            this.setState({
                error: {
                    isLoading: false,
                    message: "Async Response is invalid, please check..."
                }
            });
            console.error('Async Response is invalid, please check...');
        }

    }

    /**
     * user input onChange handler, set state id and request
     * @param e
     */
    handleInputChange(e) {
        this.setState({ id: e.target.value }, () => {
            this.sendAxiosRequest();
        });
    }

    /**
     * renter method
     */
    render() {
        const { error } = this.state;

        return (
            <div className="App">
                <h1>Fetch asynchronous data from an API (2h)</h1>
                <p>Type in a random number, this user with the given number is fetched</p>

                <InputItem
                    inputValue={this.state.id}
                    onInputChange={this.handleInputChange}
                />

                {error ? <p className="error">{error.message}</p> : null}

                <div className="container">
                    <UserData
                        isLoading={this.state.isLoading}
                        userData={this.state.userData}
                    />

                    <CommentList
                        isLoading={this.state.isLoading}
                        userId={this.state.id}
                        comments={this.state.userComments}
                    />
                </div>
            </div>
        );
    }
}