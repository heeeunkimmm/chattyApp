import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
		  messages: [
			  {
			  	id: 1,
			  	username: "Bob",
			  	content: "Has anyone seen my marbles?",
			  },
			  {
			  	id: 2,
			  	username: "Anonymous",
			  	content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
			  }
			]
		}
		this.addMessage = this.addMessage.bind(this);
	}

	//incoming message
	addMessage(content) {
		console.log(content);
		let addMessage = {
			id: Math.random(),
			username: this.state.currentUser.name,
			content: content
		};
		const newMessage = this.state.messages.concat(addMessage);
		console.log(newMessage)
		this.setState({
			messages: newMessage
		})
	}

	componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  		}, 3000);
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
		  	currentUser={ this.state.currentUser }
		  	addMessage= { this.addMessage }/>
		  </div>
			)
	}
}
export default App;
