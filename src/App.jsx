import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const uuid = require('uuid');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
		  messages: []
		}
		this.addMessage = this.addMessage.bind(this);
		this.addUser = this.addUser.bind(this);
 	}


	componentDidMount() {
		this.socket = new WebSocket('ws://localhost:3001');
		console.log("connected to the server");

		// this.socket.addEventListener('user', (event) => {
		// 	const newUser = this.state.currentUser;
		// 	const userObject = JSON.parse(event.data);
		// 	newUser.push(userObject);
		// 	this.setState({
		// 		currentUser: newUser
		// 	})
		// })

		this.socket.addEventListener('message', (event) => {
			const newMessages = this.state.messages;
			const messageObject = JSON.parse(event.data);
			newMessages.push(messageObject);
			this.setState({
				messages: newMessages
			})
		})
	}

	//incoming message
	addMessage(content) {
		console.log(content);
		let addMessage = {
			id: uuid(),
			username: this.state.currentUser.name,
			content: content
		};
		this.socket.send(JSON.stringify(addMessage));

	}

	//incoming user
	addUser(user) {
		console.log(user);
		// let addUser = {
		// 	name: user
		// };
		// this.socket.send(JSON.stringify(addUser));
	}


	render() {
		console.log("Rendering <App/>");
		return (
			<div>
			<nav className="navbar">
		    <a href="/" className="navbar-brand">Chatty</a>
		  </nav>
		  <MessageList messages={ this.state.messages }/>
		  <ChatBar
		  	// currentUser= { this.state.currentUser }
		  	addUser= { this.addUser }
		  	addMessage= { this.addMessage }/>
		  </div>
			)
	}
}
export default App;
