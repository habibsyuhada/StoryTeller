import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';

class Main_view extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TotalPlayer: 0,
    }; 
  }
  componentDidMount() {
    global.socketlink.on('num player', ({num}) => {
      this.setState({TotalPlayer: num})
      console.log(num)
    })
  }
  render() {
    return (
      <div className="container">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader><h3 className="text-center">Setup</h3></CardHeader>
              <CardBody>
                <FormGroup>
                  <Label>Jumlah Player</Label>
                  <Input readOnly type="text" value={this.state.TotalPlayer} />
                </FormGroup>
                <Button color="primary" size="sm" block>Play</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Main_view;