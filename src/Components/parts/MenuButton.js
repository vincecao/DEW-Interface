import React, { } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let handleOnClick = (addToast, intent, text, onClickCallBack) => {
  addToast(intent, text)
  if (onClickCallBack !== undefined) {
    onClickCallBack()
  }
}

const MenuButton = ({ icon, backgroundColor, text, intent, addToast, onClickCallBack }) => {
  return (
    <>
      <Button style={{ backgroundColor, border: 'none', margin: 5, width: 50 }} onClick={() => handleOnClick(addToast, intent, text, onClickCallBack)}> <FontAwesomeIcon icon={icon} /></Button>
    </>
  )
}

export default MenuButton
