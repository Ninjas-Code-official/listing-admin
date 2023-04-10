import React, { useState } from 'react'
// node.js library that concatenates classes (strings)
// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Row,
  FormGroup,
  Input,
  Col
} from 'reactstrap'

import Header from 'components/Headers/Header.jsx'
import {
  getDashboardTotal,
} from '../apollo/server'
import { gql, useQuery } from '@apollo/client'

const GET_DASHBOARD_TOTAL = gql`
  ${getDashboardTotal}
`

const intializeStartDate = () => {
  var d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString().substr(0, 10)
}
const Dashboard = props => {
  const [startingDate, setStartingDate] = useState(intializeStartDate)
  const [endingDate, setEndingDate] = useState(
    new Date().toISOString().substr(0, 10)
  )

  const {
    data,
    loading,
    error
  } = useQuery(GET_DASHBOARD_TOTAL, {
    variables: {
      starting_date: startingDate.toString(),
      ending_date: endingDate.toString()
    }
  })
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {error ? null : (
          <Row>
            <Col className="mb-lg-5 mb-sm-3" xl="6">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        {'Active Items'}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loading
                          ? '...'
                          : data.getDashboardTotal.total_orders}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                        <i className="ni ni-cart" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-lg-5 mb-sm-3" xl="6">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        {'Total Users'}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loading
                          ? '...'
                          : data.getDashboardTotal.total_users}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                        <i className="ni ni-single-02" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-lg-5 mb-sm-3" xl="6">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        {'Sold Items'}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loading
                          ? '...'
                          : data.getDashboardTotal.total_sales}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        <Row className="mb-lg-5 mb-sm-3">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <h6 className="text-uppercase text-light ls-1 mb-1">
                    Filter Graph
                  </h6>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="4">
                    <FormGroup>
                      <label className="form-control-label">
                        Starting Date
                      </label>
                      <Input
                        className="form-control-alternative"
                        type="date"
                        max={new Date().toISOString().substr(0, 10)}
                        onChange={event => {
                          console.log(event.target.value)
                          setStartingDate(event.target.value)
                        }}
                        value={startingDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="4">
                    <FormGroup>
                      <label className="form-control-label">Ending Date</label>
                      <Input
                        className="form-control-alternative"
                        type="date"
                        max={new Date().toISOString().substr(0, 10)}
                        onChange={event => {
                          setEndingDate(event.target.value)
                        }}
                        value={endingDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-description">
                        {'Filter Graph'}
                      </label>
                      <Button className="btn-block" color="success">
                        {'Submit'}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {error ? null : (
            <></>
          )}
          {error ? null : (
            <></>
          )}
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
