import React, { Component } from "react";
import MDEditor from '@uiw/react-md-editor';

export default class MdEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ message: event });
    console.log(event)
  }
  render() {
    const styleEditor = { display: this.props.editorDisplay };
    return (
      <div className="container" style={styleEditor}>
      <MDEditor
        value={this.state.message}
        onChange={this.handleChange}
        />
    </div>
  );
}
}
