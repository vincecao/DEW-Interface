import React from 'react'
import { Card } from 'react-bootstrap';


const ResultCard = ({ bg, header, height }) => {
  return (
    <Card bg={bg} text={bg === 'light' ? 'black' : 'white'} style={{ flex: 1, margin: 20, height }}>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Card.Title>{header} Card Title</Card.Title>
        <Card.Text>
          {header} context
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ResultCard