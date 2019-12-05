import React, { } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Position, Toaster } from "@blueprintjs/core";

let toaster

let refHandlers = {
  toaster: (ref) => toaster = ref,
}

let addToast = (intent, message) => {
  toaster.show({ intent, message });
}

let handleOnClick = (intent, text) => {
  addToast(intent, text + ' click!')
}

const MenuButton = ({ icon, backgroundColor, text, intent }) => {
  return (
    <>
      <Toaster position={Position.TOP_RIGHT} ref={refHandlers.toaster}>
      </Toaster>
      <Button style={{ backgroundColor, border: 'none', margin: 5, width: 50 }} onClick={() => handleOnClick(intent, text)}> <FontAwesomeIcon icon={icon} /></Button>
    </>
  )
}

export default MenuButton
