import React, { Component } from 'react'
import ResultCard from '../parts/ResultCard'
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap'
import { Position, Tooltip, Intent } from "@blueprintjs/core";
import { faTimes, faTimesCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class HlbDiv extends Component {

  constructor(props) {
    super(props)
    this.state = {
      behaviorCount: 1,
      behaviorInputs: ['Default Line1', 'Default Line2'],
      currentActive: -1,
      currentCard: 'Actors',
      behaviorSuggestionLst: ['wait t', 'emit'],
      constraintsSuggestionLst: ['num', 'os', 'link', 'lan', 'interface', 'location', 'nodetype']
    }
  }

  handleOnInputClear = (index) => {
    console.log('clear in input ' + index)
    let temp = this.state.behaviorInputs
    temp[index] = ''
    this.setState({
      ...this.states,
      behaviorInputs: temp
    })
    this.props.addToast(Intent.WARNING, "Clear one line")
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
    let temp = this.state.behaviorInputs
    temp[index] = e.target.value
    this.setState({
      ...this.state,
      behaviorInputs: temp
    })
  }

  handleKeyPress = (target, index) => {
    if (target.charCode === 13) {
      if (this.state.behaviorInputs[index] === '' || (this.state.behaviorInputs && this.state.behaviorInputs[index + 1] === '')) {
        this.props.addToast(Intent.DANGER, "Please fill line first")
      } else {
        let temp = this.state.behaviorInputs
        temp.splice(index + 1, 0, '')
        this.setState({
          ...this.state,
          behaviorCount: this.state.behaviorCount + 1,
          behaviorInputs: temp
        })
      }
    }
  }

  renderbehaviorInputs = () => {
    if (this.state.behaviorInputs.length === 0) return <Button className='btn-light' onClick={() => this.setState({ ...this.state, behaviorInputs: [''] })}><FontAwesomeIcon icon={faPlus} /></Button>
    return this.state.behaviorInputs.map((input, index) => <div style={{ display: 'flex', flexDirection: 'row' }} key={'div-inputGroup-' + index}>
      <InputGroup className="mb-3" >
        <InputGroup.Prepend>
          <Tooltip content="Press return to create a new behavior" position={Position.RIGHT}>
            <InputGroup.Text className='btn-light border-0'>{index + 1}</InputGroup.Text>
          </Tooltip>
        </InputGroup.Prepend>
        <FormControl aria-label="Amount (to the nearest dollar)" onClick={() => this.handleOnClickWithSuggestionChange('Behavior')} value={this.state.behaviorInputs[index]} onKeyPress={target => this.handleKeyPress(target, index)} onChange={(e) => { this.handleBehaviorValueOnChange(e, index) }} />
        <InputGroup.Append>
          <Button variant="outline-danger" className='btn-light border-0' onClick={() => this.handleOnInputClear(index)}><FontAwesomeIcon icon={faTimesCircle} /></Button>
        </InputGroup.Append>
      </InputGroup><Button variant="outline-danger" className='btn-light border-0 ml-3' style={{ height: 38 }} onClick={() => this.handleOutInputClear(index)}><FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>)
  }


  handleOnClickWithSuggestionChange = (name) => {
    this.setState({
      ...this.state,
      currentCard: name
    })
  }

  renderActorCard = () => {
    return <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        {/* <Form.Label>Example textarea</Form.Label> */}
        <Form.Control as="textarea" rows="5" onClick={() => this.handleOnClickWithSuggestionChange('Actors')} />
      </Form.Group>
    </Form>
  }

  renderConstraintCard = () => {
    return <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        {/* <Form.Label>Example textarea</Form.Label> */}
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

    if (this.state.currentCard === 'Behavior') return this.state.behaviorSuggestionLst.map((item, index) => <Button key={'behavior-suggestion-' + index} className='btn-secondary' style={{ margin: 5 }}>{item}</Button>)

    if (this.state.currentCard === 'Constraints') return this.state.constraintsSuggestionLst.map((item, index) => <Button key={'constraints-suggestion-' + index} className='btn-warning' style={{ margin: 5 }}>{item}</Button>)

  }


  render() {
    return (
      <>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ flex: 2 }}>
            <ResultCard bg='info' header='Actors' render={this.renderActorCard()} />
            <ResultCard bg='secondary' header='Behavior' render={this.renderbehaviorInputs()} />
            <ResultCard bg='warning' header='Constraints' render={this.renderConstraintCard()} />
          </div>
          <div style={{ flex: 1 }}>
            <ResultCard bg='dark' header={'Suggestions - ' + this.state.currentCard} height={670} render={this.renderSuggestionCard()} />
          </div>
        </div>
      </>
    )
  }
}
