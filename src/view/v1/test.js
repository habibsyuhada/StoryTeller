import React, { Component } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Row } from 'reactstrap';

class main_view extends Component {
  render() {
    return (
      <Row>
        <Col md="9">
          <Card className="main_story_container">
            <CardBody>
              <div className="preview_container"></div>
              <div className="input_container">
                <Form>
                  <FormGroup>
                    <Input type="textarea" name="text" />
                  </FormGroup>
                  <Button size="sm">Submit</Button>
                </Form>
              </div>
            </CardBody>
          </Card>
          <Card className="submain_story_container">
            <CardBody>
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