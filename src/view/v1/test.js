import React, { Component } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import StoryDataService from "../../services/story.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ModalUser from "./user";

class Chatbox_view extends Component{
  constructor(props) {
    super(props);
    this.onClickSubmitChat = this.onClickSubmitChat.bind(this);
    this.onChangeTextChat = this.onChangeTextChat.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.chats_data = [];
    this.state = {
      TextChat: "",
      chats_data: this.chats_data,
    }; 
    
  }
  componentDidMount() {
    global.socketlink.on('chat message', ({name, text_chat}) => {
    this.chats_data.push(<li><b>{name}</b>: {text_chat}</li>);
      this.setState({chats_data: this.chats_data})
    })
  }
  onChangeTextChat(event) {
    this.setState({TextChat: event.target.value})
  }
  onClickSubmitChat() {
    this.setState({TextChat: ""})
    global.socketlink.emit('chat message', { name: "Habib", text_chat: this.state.TextChat })
  }
  keyPress(e){
    if(e.keyCode == 13){
      e.preventDefault();
      this.onClickSubmitChat();
    }
  }
  render() {
    return (
      <div id="chat_container">
        <ul>{this.chats_data}</ul>
        <Form>
          <FormGroup>
          <InputGroup size="sm">
            <Input type="text" onChange={this.onChangeTextChat} value={this.state.TextChat} onKeyDown={this.keyPress}/>
            <InputGroupAddon addonType="append"><Button color="success" onClick={this.onClickSubmitChat}><FontAwesomeIcon icon={faPaperPlane} /></Button></InputGroupAddon>
          </InputGroup>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

class Main_view extends Component {
  constructor(props) {
    super(props);
    this.onChangeTextPreview = this.onChangeTextPreview.bind(this);
    this.onClickSubmitStory = this.onClickSubmitStory.bind(this);
    this.retrieveStories = this.retrieveStories.bind(this);
    this.onClickShowStory = this.onClickShowStory.bind(this);
    this.state = {
      TextPreview: "",
      TextStoryView: "",
      stories: [],
      showing: false,
    }; 
  }
  componentDidMount() {
    this.retrieveStories();
  }
  onChangeTextPreview(event) {
    this.setState({TextPreview: event.target.value})
  }
  onClickSubmitStory() {
    var data = {
      story_by: "Habib",
      story_text: this.state.TextPreview
    };
    StoryDataService.create(data)
      .then(response => {
        this.retrieveStories();
        this.setState({
          TextPreview: "",
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveStories() {
    StoryDataService.getAll()
      .then(response => {
        this.setState({
          stories: response.data
        });
        
      })
      .catch(e => {
        console.log(e);
      });
  }
  onClickShowStory(event) {
    this.setState({TextStoryView: event.target.textContent})
    this.setState({ showing: true })
  }
  render() {
    const { stories, showing } = this.state;
    return (
      <Row>
        <Col md="9">
          <Card className="main_story_container">
            <CardBody>
              <div className="preview_container">
                <Button id="btn_close_preview" onClick={() => this.setState({ showing: false })} style={{ display: (showing ? 'inline-block' : 'none') }} className="font-weight-bold" color="danger"><FontAwesomeIcon icon={faTimes} /></Button>
                <ModalUser/>
                <h1 id="text_preview">{(showing ? this.state.TextStoryView : this.state.TextPreview)}</h1>
              </div>
              <div className="input_container">
                <Form>
                  <FormGroup>
                    <Input type="textarea" name="text" className="no-resize" value={this.state.TextPreview} onChange={this.onChangeTextPreview} />
                  </FormGroup>
                  <Button color="success" size="sm" onClick={this.onClickSubmitStory}><FontAwesomeIcon icon={faCheck} /> Submit</Button>
                </Form>
              </div>
            </CardBody>
          </Card>
          <Card className="submain_story_container">
            <CardBody className="py-1">
              {stories &&
                stories.map((story, index) => (
                  <div className="submain_card"><div><span onClick={this.onClickShowStory}>{story.story_text}</span></div></div>
                ))}
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Card className="chat_container">
            <CardBody>
              <Chatbox_view/>
            </CardBody>
          </Card>          
        </Col>
      </Row>
    )
  }
}

export default Main_view;