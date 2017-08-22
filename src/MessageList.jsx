import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages.map(messages => {
      return (
        <Message
          key={ messages.id }
          username={ messages.username }
          content={ messages.content }/>
      )
    });

    return (
    <div id ="message-list">
      { messages }
    </div>
    );
  }
}
export default MessageList;