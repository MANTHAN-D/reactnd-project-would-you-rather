import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap'

import { handleAddQuestion } from '../actions/questions'

import './newquestion.css'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  handleCancel = e => {
    this.setState({
      optionOne: '',
      optionTwo: ''
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { authedUser, handleAddQuestion } = this.props

    let question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    }

    handleAddQuestion(question)
  }

  render() {
    const { optionOne, optionTwo } = this.state
    return (
      <Panel className="new-question-page-container">
        <Panel.Heading>
          <Panel.Title componentClass="h3">New Question</Panel.Title>
        </Panel.Heading>
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Row className="new-question-header">
              <Col>
                <div>Would you rather</div>
              </Col>
            </Row>
            <Row className="option-container">
              <Col>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Enter Option One"
                    maxLength="150"
                    name="optionOne"
                    value={optionOne}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="option-container">
              <Col>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Enter Option Two"
                    maxLength="150"
                    name="optionTwo"
                    value={optionTwo}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="submit-container">
              <Col>
                <Button onClick={this.handleCancel}>Cancel</Button>
                <Button
                  type="submit"
                  disabled={optionOne === '' || optionTwo === ''}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Grid>
        </form>
      </Panel>
    )
  }
}

const mapStateToProp = ({ authedUser }) => {
  return {
    authedUser
  }
}

const mapDispatchToProp = dispatch => {
  return {
    handleAddQuestion: question => dispatch(handleAddQuestion(question))
  }
}
export default connect(
  mapStateToProp,
  mapDispatchToProp
)(NewQuestion)
