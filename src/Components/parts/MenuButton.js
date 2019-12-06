import React, { } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let handleOnClick = (addToast, intent, text) => {
  addToast(intent, text + ' click!')
}

const MenuButton = ({ icon, backgroundColor, text, intent, addToast }) => {
  return (
    <>
      <Button style={{ backgroundColor, border: 'none', margin: 5, width: 50 }} onClick={() => handleOnClick(addToast, intent, text)}> <FontAwesomeIcon icon={icon} /></Button>
    </>
  )
}

export default MenuButton
