import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import TagButton from '../parts/TagButton'

export default class MyNav extends Component {
  render() {
    return (
      <Nav
        variant="tabs"
        defaultActiveKey="hlb-event"
        onSelect={selectedKey => { }}
        style={{ paddingTop: 10 }}
      >
        <TagButton link={'none'} text={"HLB"} eventKey={'hlb-event'} isActived={true} isDisabled={false} />
        <TagButton link={'none'} text={"NLP"} eventKey={'nlp-event'} isActived={false} isDisabled={false} />
        <TagButton link={'none'} text={"Behavior Dependency Graph"} eventKey={'bdg-event'} isActived={false} isDisabled={false} />
        <TagButton link={'none'} text={"Topology"} eventKey={'top-event'} isActived={false} isDisabled={true} />
      </Nav>
    )
  }
}
