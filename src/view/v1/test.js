import React, { Component } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import StoryDataService from "../../services/story.service";
import socketIOClient from "socket.io-client";
import socketlink from '../../services/socket.service';


class Substory_view extends Component{
  constructor(props) {
    super(props);
    this.retrieveStories = this.retrieveStories.bind(this);

    this.state = {
      stories: [],
    };
  }

  componentDidMount() {
    this.retrieveStories();
  }

  retrieveStories() {
    StoryDataService.getAll()
      .then(response => {
        this.setState({
          stories: response.data
        });
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { stories } = this.state;
    return (
      <CardBody className="py-1">
        {stories &&
          stories.map((story, index) => (
            <div className="submain_card"><div><span>{story.story_text}</span></div></div>
          ))}
      </CardBody>
    )
  }
}

class Main_view extends Component {
  constructor(props) {
    super(props);
    this.onChangeTextPreview = this.onChangeTextPreview.bind(this);
    this.onClickSubmitStory = this.onClickSubmitStory.bind(this);
    this.state = {
      TextPreview: "",
    }; 

    this.SubStoryElement = React.createRef();
  }
  componentDidMount() {
    global.socketlink.on('chat message', (text_chat) => {
      console.log(text_chat);
    })
  }
  onChangeTextPreview(event) {
    this.setState({TextPreview: event.target.value})
    console.log(event.target.value);
    global.socketlink.emit('chat message', event.target.value)
  }
  onClickSubmitStory() {
    var data = {
      story_by: "Habib",
      story_text: this.state.TextPreview
    };
    StoryDataService.create(data)
      .then(response => {
        this.setState({
          TextPreview: "",
        });
        console.log(response.data);
        this.SubStoryElement.current.retrieveStories();
      })
      .catch(e => {
        console.log(e);
      });
    console.log("Submited!");
  }
  render() {
    return (
      <Row>
        <Col md="9">
          <Card className="main_story_container">
            <CardBody>
              <div className="preview_container">
                <h1 id="text_preview">{this.state.TextPreview}</h1>
              </div>
              <div className="input_container">
                <Form>
                  <FormGroup>
                    <Input type="textarea" name="text" className="no-resize" value={this.state.TextPreview} onChange={this.onChangeTextPreview} />
                  </FormGroup>
                  <Button size="sm" onClick={this.onClickSubmitStory}>Submit</Button>
                </Form>
              </div>
            </CardBody>
          </Card>
          <Card className="submain_story_container">
            <Substory_view ref={this.SubStoryElement} />
          </Card>
        </Col>
        <Col md="3">
          <Card className="chat_container">
            <CardBody>
            </CardBody>
          </Card>          
        </Col>
      </Row>
    )
  }
}

export default Main_view;