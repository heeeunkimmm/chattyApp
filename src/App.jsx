import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  currentUser: "Bob", // optional. if currentUser is not defined, it means the user is Anonymous
		  messages: []
		}
		this.addMessage = this.addMessage.bind(this);
		this.addUser = this.addUser.bind(this);
 	}


	componentDidMount() {
		this.socket = new WebSocket('ws://localhost:3001');
		console.log("connected to the server");

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
		console.log('this is the new name:', this.state.currentUser);
		let addMessage = {
			username: this.state.currentUser,
			content: content,
			type: 'postMessage'
		};
		console.log(addMessage);
		this.socket.send(JSON.stringify(addMessage));

	}

	//incoming user
	addUser(user) {
		// console.log("bob: ", this.state.currentUser.name);
		// console.log(user);
		let addUser = {
			username: user,
			type: 'change-user',
			content: this.state.currentUser + " changed their name to " + user
		};
		this.setState({
			currentUser: user
		})
		this.socket.send(JSON.stringify(addUser));
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
