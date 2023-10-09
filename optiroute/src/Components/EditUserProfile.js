import React from 'react'
import ReactDOM from 'react-dom'

class Username extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ""};
    this.state = {value: ""};
  }

  changeValue(value) {
    this.setState({value: value});
  }

  render() {
    const value = this.state.value;
    return <h1>{value}</h1>;
  }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.userNameRef = React.createRef();
        this.bioRef = React.createRef();
        this.emailRef = React.createRef();
    }

  clickHandler() {
    var name = document.getElementById('name_input').value;
    this.userNameRef.current.setState({value: name});
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler.bind(this)}>Change Username</button>
        <input id="name_input" type="text" />
        <Username ref={this.userNameRef} />

        <button onClick={this.clickHandler.bind(this)}>Change Bio</button>
        <input id="name_input" type="text" />
        <Username ref={this.bioRef} />

        <button onClick={this.clickHandler.bind(this)}>Change Email Address</button>
        <input id="name_input" type="text" />
        <Username ref={this.emailRef} />
        

      </div>

      
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
