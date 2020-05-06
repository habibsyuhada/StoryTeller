import React, { Component } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Row } from 'reactstrap';

class main_view extends Component {
  constructor(props) {
    super(props);
    this.onChangeTextPreview = this.onChangeTextPreview.bind(this);
    this.state = {
      TextPreview: "",
    }; 
  }
  onChangeTextPreview(event) {
    this.setState({TextPreview: event.target.value})
    console.log(event.target.value);
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
                    <Input type="textarea" name="text" className="no-resize" value={this.state.title} 
    onChange={this.onChangeTextPreview} />
                  </FormGroup>
                  <Button size="sm">Submit</Button>
                </Form>
              </div>
            </CardBody>
          </Card>
          <Card className="submain_story_container">
            <CardBody className="py-1">
              <div className="submain_card"><div><span>asdasdasdaaaaaa aaaaaaaaaaaaaaaaaaaaa aaaaaa</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
              <div className="submain_card"><div><span>asdasdasd</span></div></div>
            </CardBody>
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

export default main_view;