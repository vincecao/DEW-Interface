import React, { Component } from 'react'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { Position, Tooltip } from "@blueprintjs/core";
import { faTimes, faTimesCircle, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Draggable } from 'react-beautiful-dnd'

export default class HlbDiv extends Component {

  divStyle = {
    display: 'flex',
    flexDirection: 'row'
  }

  dragBtnStyle = {
    height: 38,
    cursor: 'move'
  }

  render() {
    const { input, index, handleOnClickWithSuggestionChange, handleKeyPress, handleBehaviorValueOnChange, handleOnInputClear, handleOutInputClear } = this.props

    return (
      <Draggable draggableId={input.id + ''} index={index} >
        {provided => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {<div style={this.divStyle}>
              <InputGroup className="mb-3" >
                <InputGroup.Prepend>
                  <Tooltip content="Press return to create a new behavior" position={Position.RIGHT} tabIndex={-1}>
                    <InputGroup.Text className='btn-light border-0' tabIndex={-1}>{index + 1}</InputGroup.Text>
                  </Tooltip>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)" onClick={() => handleOnClickWithSuggestionChange('Behavior')} value={input.command} onKeyPress={target => handleKeyPress(target, index)} onChange={(e) => handleBehaviorValueOnChange(e, index)} />
                <InputGroup.Append>
                  <Button variant="outline-danger" className='btn-light border-0' onClick={() => handleOnInputClear(index)} tabIndex={-1}><FontAwesomeIcon icon={faTimesCircle} /></Button>
                </InputGroup.Append>
              </InputGroup>
              <Button variant="outline-danger" className='btn-light border-0 ml-2' style={{ height: 38 }} onClick={() => handleOutInputClear(index)} tabIndex={-1}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button variant="outline-light" className='btn-secondary border-0 ml-1' style={this.dragBtnStyle} tabIndex={-1} {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </div>}
          </div>

        )}
      </Draggable>
    )
  }
}