/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ModalExample = (props) => {
  var UserName = "";

  const {
    className,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const setname = () => {
    if(UserName == ""){
      localStorage.removeItem('UserName');
    }
    else{
      localStorage.setItem('UserName', UserName);
    }
  };
  const onChangeUserName = (event) => {
    UserName = event.target.value;
  };

  return (
    <div>
      <Button className="font-weight-bold" color="primary" onClick={toggle}><FontAwesomeIcon icon={faUser} /></Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Your Name</Label>
            <Input type="text" onChange={onChangeUserName} placeholder="What is Your Name?" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={setname}>Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;