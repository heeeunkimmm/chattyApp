import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userCount: 0,
		  currentUser: "Bob",
		  messages: []
		};

		this.addMessage = this.addMessage.bind(this);
		this.addUser = this.addUser.bind(this);
 	}

	componentDidMount() {
		this.socket = new WebSocket('ws://localhost:3001');
		console.log("connected to the server");

		this.socket.addEventListener('message', (event) => {
			const newMessages = this.state.messages;
			const messageObject = JSON.parse(event.data);
			switch(messageObject.type) {
				case "incomingMessage":
					newMessages.push(messageObject);
					this.setState({
						messages: newMessages
					})
					break;
				case "incomingNotification":
					newMessages.push(messageObject);
					this.setState({
						messages: newMessages
					})
					break;
				case "userCountChanged":
					this.setState({
						userCount: messageObject.content
					});
			};
		});
	};

	//incoming message
	addMessage(content) {
		let addMessage = {
			username: this.state.currentUser,
			content: content,
			type: 'postMessage'
		};
		this.socket.send(JSON.stringify(addMessage));
	};

	//incoming user
	addUser(user) {
		let addUser = {
			username: user,
			type: 'postNotification',
			content: this.state.currentUser + " changed their name to " + user
		};
		this.setState({
			currentUser: user
		});
		this.socket.send(JSON.stringify(addUser));
	};

	render() {
		console.log("Rendering <App/>");
		return (
			<div>
			<NavBar userCount= { this.state.userCount }/>
		  <MessageList messages={ this.state.messages }/>
		  <ChatBar
		  	addUser= { this.addUser }
		  	addMessage= { this.addMessage }/>
		  </div>
			);
	};
};
export default App;
