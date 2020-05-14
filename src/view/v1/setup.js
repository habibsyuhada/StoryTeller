import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import StoryDataService from "../../services/story.service";
import ModalUser from "./user";

class Main_view extends Component {
  constructor(props) {
    super(props);
    this.onClickPlay = this.onClickPlay.bind(this);

    this.state = {
      TotalPlayer: 0,
    }; 
  }
  componentDidMount() {
    global.socketlink.on('num player', ({num}) => {
      this.setState({TotalPlayer: num})
      console.log(num)
    })
    if(localStorage.getItem('UserName') !== null){
      global.socketlink.emit('set name player', { name: localStorage.getItem('UserName') })
    }
  }
  onClickPlay() {
    var data = {
      story_by: "Habib",
      story_text: "Pada suatu hari disuatu desa hiduplah anak yang bernama"
    };
    StoryDataService.create(data)
      .then(response => {
        global.socketlink.emit('start game', global.socketlink.id)
        global.socketlink.emit('refresh story', global.socketlink.id)
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div className="container">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader><h3 className="text-center">Setup</h3></CardHeader>
              <CardBody>
                <ModalUser/>
                <FormGroup>
                  <Label>Jumlah Player</Label>
                  <Input readOnly type="text" value={this.state.TotalPlayer} />
                </FormGroup>
                <Button color="primary" size="sm" block onClick={this.onClickPlay}>Play</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Main_view;