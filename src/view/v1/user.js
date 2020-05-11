/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ModalExample = (props) => {

  const {
    className,
  } = props;

  const [modal, setModal] = useState(false);
  const [UserName, setUserName] = useState("");

  const toggle = () => {
    setModal(!modal)
    if(modal == false && localStorage.getItem('UserName') !== null){
      setUserName(localStorage.getItem('UserName'));
    }
  };
  const setname = () => {
    if(UserName == ""){
      localStorage.removeItem('UserName');
    }
    else{
      var last_name = localStorage.getItem('UserName')
      localStorage.setItem('UserName', UserName);
      global.socketlink.emit('notif chat', { notif_text: (last_name ? last_name : "New Player") + " Change Name to " + localStorage.getItem('UserName') + ".", id: global.socketlink.id })
      global.socketlink.emit('set name player', { name: UserName })
    }
    toggle();
  };
  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <Button className="font-weight-bold" color="primary" onClick={toggle}><FontAwesomeIcon icon={faUser} /> Profile</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Your Name</Label>
            <Input type="text" onChange={onChangeUserName} value={UserName} placeholder="What is Your Name?" />
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