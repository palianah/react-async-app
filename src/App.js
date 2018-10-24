import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

/*
 * TODO: split code/features to components if time left...
*/

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
            name: '',
            username: '',
            email: '',
            address: [],
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
            name: '',
            username: '',
            email: '',
            address: [],
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
                        name: res.data.name,
                        username: res.data.username,
                        email: res.data.email,
                        address: res.data.adress,
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
        this.setState({ id: e.target.value });

        // update data with a minimal interval
        setTimeout(() => {
            this.sendAxiosRequest();
        }, 100);
    }

    /**
     * renter method
     */
    render() {
        const { isLoading, error } = this.state;
        const name = this.state.name;
        const comments = this.state.userComments;

        return (
            <div className="App">
                <h1>Fetch asynchronous data from an API (2h)</h1>

                <p>Type in a random number, this user with the given number is fetched</p>
                <input type="number"
                       name="id"
                       className="input"
                       value={this.state.id}
                       onChange={this.handleInputChange}
                />

                {error ? <p className="error">{error.message}</p> : null}

                <div className="container">

                    <h2>User Data</h2>
                    {!isLoading && name !== '' ? (

                        <div className="user">
                            <p className="user__text">
                                <span>{this.state.name}</span>
                            </p>
                            <p className="user__text">
                                <span>{this.state.username}</span>
                            </p>
                            <p className="user__text">
                                <span>{this.state.email}</span>
                            </p>
                        </div>
                    ): (
                        <p className="error">Keinen Benutzer mit der ID {this.state.id} gefunden</p>
                    )}

                    <h2>Comments (first five)</h2>
                    {!isLoading && comments.length > 0 ? (
                        comments.slice(0, 5).map(comment => {
                            const { id, title, body } = comment;

                            return(
                                <blockquote className="comment" key={id}>
                                    <p className="comment__title">
                                        {title}
                                    </p>
                                    <p className="comment__body">
                                        {body}
                                    </p>
                                </blockquote>
                            )
                        })
                    ): (
                        <p className="error">Keine Kommentare mit der ID {this.state.id} gefunden</p>
                    )}
                </div>
            </div>
        );
    }
}