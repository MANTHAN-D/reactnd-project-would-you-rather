import React from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'

import './error.css'

const NotFound = props => {
  return (
    <Panel className="error-page-container">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Error</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Grid>
          <Row className="error-page-header">
            <Col>
              <div>404 Not Found</div>
            </Col>
          </Row>
          <Row className="error-body-message">
            <Col>
              <div>
                Oops! Sorry. The question you are looking for cannot be found!
              </div>
            </Col>
          </Row>
        </Grid>
      </Panel.Body>
    </Panel>
  )
}

export default NotFound
