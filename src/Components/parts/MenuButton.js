import React, { } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MenuButton = ({ icon, backgroundColor }) => {
  return (
    <Button style={{ backgroundColor, border: 'none', margin: 5, width: 50 }}> <FontAwesomeIcon icon={icon} /></Button>
  )
}

export default MenuButton
