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
    global.socketlink.on('notif chat', ({notif_text, id}) => {
      if(global.socketlink.id != id){
        this.chats_data.push(<li className="notif"><b>{notif_text}</b></li>);
      }
    })
    if(localStorage.getItem('UserName') !== null){
      global.socketlink.emit('set name player', { name: localStorage.getItem('UserName') })
    }
  }
  onChangeTextChat(event) {
    this.setState({TextChat: event.target.value})
  }
  onClickSubmitChat() {
    this.setState({TextChat: ""})
    if(localStorage.getItem('UserName') === null){
      alert("You Should Have a Name to Chat");
    }
    else{
      if(this.state.TextChat != ""){
        global.socketlink.emit('chat message', { name: localStorage.getItem('UserName'), text_chat: this.state.TextChat })
      }
    }
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
        <div id="list_chat">
          <ul>{this.chats_data}</ul>
        </div>
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
      turn_player: "",
      turn_player_name: "",
    }; 
  }
  componentDidMount() {
    this.retrieveStories();
    global.socketlink.on('typing story', ({id, name, text_story}) => {
      this.setState({TextPreview: text_story})
    })
    global.socketlink.on('find name turn player', ({player}) => {
      if(global.socketlink.id == player){
        global.socketlink.emit('send name turn player', { id: global.socketlink.id, name: localStorage.getItem('UserName') })
      }
    })
    global.socketlink.on('set turn player', ({player, playername}) => {
      this.setState({turn_player: player})
      this.setState({turn_player_name: playername})
    })
    global.socketlink.on('refresh story', data => {
      this.retrieveStories();
      this.setState({ TextPreview: "" });
    })
    global.socketlink.on('connect', () => {
      global.socketlink.emit('notif chat', { notif_text: (localStorage.getItem('UserName') ? localStorage.getItem('UserName') : "New Player") + " Join The Game.", id: global.socketlink.id })
    })
  }
  onChangeTextPreview(event) {
    if(this.state.turn_player != global.socketlink.id){
      alert("Not Your Turn")
      return false
    }
    this.setState({TextPreview: event.target.value})
    global.socketlink.emit('typing story', { id: global.socketlink.id, name: localStorage.getItem('UserName'), text_story: event.target.value })
  }
  onClickSubmitStory() {
    if(this.state.turn_player != global.socketlink.id){
      alert("Not Your Turn")
      return false
    }
    var data = {
      story_by: "Habib",
      story_text: this.state.TextPreview
    };
    StoryDataService.create(data)
      .then(response => {
        global.socketlink.emit('refresh story', global.socketlink.id)
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
                  <span> {(this.state.turn_player_name ? this.state.turn_player_name + "Turn" : "Waiting Other Player")}</span>
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