import React, { Component } from "react";
import MDEditor from '@uiw/react-md-editor';
import '../../../Style/Openvidu/MdEditorComponent.css'

export default class MdEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "**Hello world!!!**" }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ message: event });
    console.log(event)
  }
  render() {
    const styleEditor = { display: this.props.editorDisplay };
    return (
      <div className='Mdeditorcontainer' style={styleEditor}>
      <MDEditor
        value={this.state.message}
        onChange={this.handleChange}
        minHeights={100}
        />
      <MDEditor.Markdown source={this.state.message} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  );
}
}