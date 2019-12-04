import React from 'react'
import { Card } from 'react-bootstrap';

const ResultCard = ({ bg, header, height, render }) => {



  return (
    <Card bg={bg} text={bg === 'light' ? 'black' : 'white'} style={{ flex: 1, margin: 18, height }}>
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        {render}
      </Card.Body>
    </Card>
  )
}

export default ResultCard