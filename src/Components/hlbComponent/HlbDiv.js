import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResultCard from '../parts/ResultCard'
import { Button, Form } from 'react-bootstrap'
import { Intent } from "@blueprintjs/core"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DragableInputGroup from '../parts/DragableInputGroup'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { TABLIST, CONSTRIANTSUGGESTIONS } from '../../dataModel'
import { updateHlbStateAction } from '../../Actions/updateHlbStateAction'

class HlbDiv extends Component {

  constructor(props) {
    super(props)

    this.state = {
      behaviorCount: 3,
      behaviorInputs: [{ id: 1, command: 'server install_iperf' }, { id: 2, command: 'when mstarted, sstarted client start_traffic emit cstarted' }, { id: 3, command: 'when cstopped server stop_measure emit mstopped' }],
      currentActive: -1,
      currentCard: 'Actors',
      autoSuggestionLst: TABLIST,
      lastFocus: {
        target: null,
        index: null
      }
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    this.setState({
      ...this.props.hlbState
    })
  }
  componentWillUnmount() {
    this.props.saveCurrentState(this.state)
  }

  handleOnInputClear = (index) => {
    console.log('clear in input ' + index)
    let temp = this.state.behaviorInputs
    temp[index].command = ''
    this.setState({
      ...this.states,
      behaviorInputs: temp
    })
    this.props.addToast(Intent.WARNING, "Clear one line")
    this.handleOnBlur(index)
  }

  handleOutInputClear = (index) => {
    console.log('clear out input ' + index)

    let temp = this.state.behaviorInputs
    temp.splice(index, 1)
    this.setState({
      ...this.states,
      behaviorInputs: temp
    })

    this.props.addToast(Intent.DANGER, "Remove one line")
  }

  handleBehaviorValueOnChange = (e, index) => {

    if (e.key === "Space") {
      let value = this.state.behaviorInputs[index].command.toString()
      if (value.slice(-1) === ' ') return false
    }


    let value = e.target.value.toString()
    let temp = this.state.behaviorInputs
    temp[index].command = value

    let n = value.split(" ")
    let lastWord = n[n.length - 1]
    let autoSuggestionLst = lastWord === '' ? TABLIST : TABLIST.filter((t) => t.indexOf(lastWord) === 0) //Replace TABLIST with request from backend server by sytax suggestion
    temp[index].suggestionPlaceHolder = value.substring(0, value.lastIndexOf(" ") + 1) + (autoSuggestionLst.length === 0 ? '' : autoSuggestionLst[0])

    this.setState({
      ...this.state,
      behaviorInputs: temp,
      autoSuggestionLst
    })

  }

  handleOnFocus = (e, index) => {
    let temp = Array.from(this.state.behaviorInputs)
    if (temp[index]['command'] !== '') {
      temp[index]['command'] = temp[index]['command'] + ' '
      this.setState({
        ...this.state,
        lastFocus: {
          target: e.target,
          index: index
        },
        behaviorInputs: temp
      })
    }
  }

  handleOnBlur = (e, index) => {
    let temp = Array.from(this.state.behaviorInputs)
    if (temp[index] !== undefined) {
      temp[index]['command'] = temp[index]['command'].trim()
      temp[index]['suggestionPlaceHolder'] = '' //temp[index]['command']
      this.setState({
        ...this.state,
        behaviorInputs: temp
      })
    }

  }

  handleKeyDown = (event, index) => {

    let currentInput = this.state.behaviorInputs[index]
    let nextInput = this.state.behaviorInputs[index + 1]
    if (event.key === " ") {
      let value = currentInput.command.toString()
      if (value.slice(-1) === ' ') {
        // console.log('false')
        event.preventDefault()
      }
    }

    if (event.key === "Enter") {
      //if (event.charCode === 13) { with on onKeypress
      if (currentInput === undefined ||
        (currentInput !== undefined && currentInput.command === '') ||
        (currentInput !== undefined && currentInput.command !== '' && nextInput !== undefined && nextInput.command === '')) {
        this.props.addToast(Intent.DANGER, "Please fill line first")
      } else {
        let temp = this.state.behaviorInputs
        temp.splice(index + 1, 0, { id: this.state.behaviorInputs.length + 1, command: '' })
        this.setState({
          ...this.state,
          behaviorCount: this.state.behaviorCount + 1,
          behaviorInputs: temp
        })
      }
    }

    if (event.key === "Tab") {
      event.preventDefault()

      let temp = this.state.behaviorInputs

      if (temp[index].suggestionPlaceHolder !== '' && temp[index].suggestionPlaceHolder !== undefined) {
        temp[index].command = temp[index].suggestionPlaceHolder.trim() + ' '
        this.setState({
          ...this.state,
          behaviorInputs: temp,
          autoSuggestionLst: TABLIST //request from server by sytax suggestion
        })
      }

      return (false)
    }
  }


  renderbehaviorInputs = () => {
    if (this.state.behaviorInputs.length === 0) return <Button className='btn-light' onClick={() => this.setState({ ...this.state, behaviorInputs: [{ id: 1, command: '' }] })}><FontAwesomeIcon icon={faPlus} /></Button>
    return (
      <Droppable droppableId={'behavior-droppable'}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {this.state.behaviorInputs.map((input, index) => <DragableInputGroup
              key={input.id + ''}
              input={input}
              index={index}
              handleOnFocus={this.handleOnFocus}
              handleOnBlur={this.handleOnBlur}
              handleOnClickWithSuggestionChange={this.handleOnClickWithSuggestionChange}
              handleKeyDown={this.handleKeyDown}
              handleBehaviorValueOnChange={this.handleBehaviorValueOnChange}
              handleOnInputClear={this.handleOnInputClear}
              handleOutInputClear={this.handleOutInputClear} />)}
            {provided.placeholder}
          </div>
        )}

      </Droppable>
    )
  }

  handleOnClickWithSuggestionChange = (name) => {
    this.setState({
      ...this.state,
      currentCard: name
    })
  }

  handleSuggestionMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.state.lastFocus['target'].focus()

    const value = this.state.lastFocus['target'].value.toString()
    let temp = this.state.behaviorInputs
    temp[this.state.lastFocus['index']]['command'] = value.substring(0, value.lastIndexOf(" ") + 1) + e.target.value + ' '
    temp[this.state.lastFocus['index']]['suggestionPlaceHolder'] = ''
    this.setState({
      ...this.state,
      behaviorInputs: temp,
      autoSuggestionLst: TABLIST //request from server by sytax suggestion
    })
    return (false)
  }

  renderActorCard = () => {
    return <Form >
      <Form.Group controlId="textareaActor" key={'textareaActor'}>
        <Form.Control as="textarea" rows="5" onClick={() => this.handleOnClickWithSuggestionChange('Actors')} />
      </Form.Group>
    </Form>
  }

  renderConstraintCard = () => {
    return <Form >
      <Form.Group controlId="textareaConstraint" key={'textareaConstraint'}>
        <Form.Control as="textarea" rows="5" onClick={() => this.handleOnClickWithSuggestionChange('Constraints')} />
      </Form.Group>
    </Form>
  }

  renderSuggestionCard = () => {
    if (this.state.currentCard === 'Actors') return <>
      <Button className='btn-light' style={{ margin: 5 }}>Suggestion</Button>
      <Button className='btn-info' style={{ margin: 5 }}>Suggestion</Button>
      <Button className='btn-success' style={{ margin: 5 }}>Suggestion</Button>
      <Button className='btn-danger' style={{ margin: 5 }}>Suggestion</Button>
      <Button className='btn-secondary' style={{ margin: 5 }}>Suggestion</Button>
      <Button className='btn-warning' style={{ margin: 5 }}>Suggestion</Button>
      <Button className='bg-dark border-light' style={{ margin: 5 }}>Suggestion</Button>
      <Button className='btn-primary' style={{ margin: 5 }}>Suggestion</Button>
    </>

    if (this.state.currentCard === 'Behavior') return this.state.autoSuggestionLst.map((item, index) => <Button key={'behavior-suggestion-' + index} className='btn-secondary' onMouseDown={(e) => this.handleSuggestionMouseDown(e)} style={{ margin: 5 }} value={item}>{item}</Button>)

    if (this.state.currentCard === 'Constraints') return CONSTRIANTSUGGESTIONS.map((item, index) => <Button key={'constraints-suggestion-' + index} className='btn-warning' style={{ margin: 5 }}>{item}</Button>)

  }

  onBehaviorDragEnd = result => {
    const { destination, source, draggableId } = result
    console.log('destination.index', destination.index, 'draggableId', draggableId)
    console.log('source.index', source.index)

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newBehaviorInputs = Array.from(this.state.behaviorInputs)
    let temp = newBehaviorInputs.splice(source.index, 1)
    newBehaviorInputs.splice(destination.index, 0, temp[0])

    this.setState({
      ...this.state,
      behaviorInputs: newBehaviorInputs
    })
  }

  render() {
    return (
      <>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ flex: 2 }}>
            <ResultCard bg='info' header='Actors' render={this.renderActorCard()} />
            <DragDropContext
              /*onDragStart
              onDragUpdate*/
              onDragEnd={this.onBehaviorDragEnd}
            >
              <ResultCard bg='secondary' header='Behavior' render={this.renderbehaviorInputs()} />
            </DragDropContext>
            <ResultCard bg='warning' header='Constraints' render={this.renderConstraintCard()} />
          </div>
          <div style={{ flex: 1 }}>
            <ResultCard bg='dark' header={'Suggestions - ' + this.state.currentCard} minHeight={670} render={this.renderSuggestionCard()} />
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hlbState: state.hlb.hlbState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveCurrentState: (state) => dispatch(updateHlbStateAction(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HlbDiv)