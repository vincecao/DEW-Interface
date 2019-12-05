import React from 'react'
import { Nav } from 'react-bootstrap'

const TagButton = (props) => {

  const { link, text, isDisabled, eventKey } = props
  if (link === 'none') {
    return (
      <Nav.Item style={{ marginLeft: 5, marginRight: 5, minWidth: 50 }}>
        {isDisabled ? <Nav.Link eventKey={eventKey} disabled>{text}</Nav.Link> : <Nav.Link eventKey={eventKey}>{text}</Nav.Link>}
      </Nav.Item>
    )
  } else {
    return (
      <Nav.Item style={{ marginLeft: 5, marginRight: 5, minWidth: 50 }}>
        {isDisabled ? <Nav.Link href={link} eventKey={eventKey} disabled>{text}</Nav.Link> : <Nav.Link href={link} eventKey={eventKey}>{text}</Nav.Link>}
      </Nav.Item>
    )
  }
}

export default TagButton