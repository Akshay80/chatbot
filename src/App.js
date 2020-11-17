import React, { Component} from 'react';
import { Widget, addResponseMessage ,addLinkSnippet, addUserMessage} from 'react-chat-widget';
import logo from './logo.png';
import 'react-chat-widget/lib/styles.css';

class App extends Component {
  componentDidMount() {
    addResponseMessage("Hi! How can I help you?");
  }
  
 async handleNewUserMessage(newMessage)
  {
    const data = {
    message: newMessage 
    }
    
    let response = await fetch(`http://localhost:5005/webhooks/rest/webhook`, {
        method: "POST",
        body: JSON.stringify(data),
        mode:"cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
     
    // Now send the message throught the backend API
      let result = await response.json()
      addResponseMessage(result[0].text)
    }
   
  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Welcome to Chatbot"
          subtitle="Powered by Akshay Bisht"
        />
      </div>
    );
  }  
  }

export default App;