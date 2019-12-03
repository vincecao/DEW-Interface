import React, { Component } from 'react'
import ResultCard from '../parts/ResultCard'

export default class OperationDiv extends Component {
  render() {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ flex: 1 }}>
          <ResultCard bg={'primary'} header='Actions' />
          <ResultCard bg='dark' header='Scenario' height={500} />
        </div>
        <div style={{ flex: 1 }}>
          <ResultCard bg='light' header='Constaints' height={200} />
          <ResultCard bg='light' header='Suggestions' />
        </div>

      </div>
    )
  }
}
