import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages.map(message => {
      if (message.type === "incomingNotification") {
        return (
          <div
            className="message system"
            key={ message.id }>
              { message.content }
          </div>
        )
      } else {
        return (
          <Message
            key={ message.id }
            username={ message.username }
            content={ message.content }/>
        )
      }
    });

    return (
    <div id ="message-list">
      { messages }
    </div>
    );
  }
}
export default MessageList;