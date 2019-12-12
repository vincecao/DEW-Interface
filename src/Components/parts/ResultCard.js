import React from 'react'
import { Card } from 'react-bootstrap'

const ResultCard = ({ bg, header, minHeight, render }) => {
  return (
    <Card bg={bg} text={bg === 'light' ? 'black' : 'white'} style={{ flex: 1, margin: 18, minHeight }}>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        {render}
      </Card.Body>
    </Card>
  )
}

export default ResultCard