import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Form, Button, Label, Input, FormGroup, Alert } from "reactstrap";
import Axios from "axios";

class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fname: '',
      sname: '',
      email: '',
      dob: '',
      gender: ''
    }
  }
  //Handles input changes
  handleIdChange = (event) => {
    this.setState({
      id: event.target.value
    })
  }
  handleFnameChange = (event) => {
    this.setState({
      fname: event.target.value
    })
  }
  handleSnameChange = (event) => {
    this.setState({
      sname: event.target.value
    })
  }
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handleDobChange = (event) => {
    this.setState({
      dob: event.target.value
    })
  }
  handleGenderChange = (event) => {
    this.setState({
      gender: event.target.value
    })
  }
  //Validates null value for Employee Id
  handleValidation = () => {
    const { id } = this.state;
    let error = '';
    let formIsValid = true;
    if (!id) {
      formIsValid = false;
      error = "Please enter Employee Id";

    }
    this.setState({ error: error });
    return formIsValid;
  }
  //Reads the data from the database
  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await Axios({
        method: "GET",
        url: "http://localhost:5000/employee",
        params: { id: this.state.id },
        headers: { "Content-type": "application/json" }
      })
        .then(res => {
          const data = res.data;
          console.log(data);
          this.setState({
            id: data.Item.EmpId,
            fname: data.Item.EmpFname,
            sname: data.Item.EmpSurname,
            email: data.Item.Email,
            dob: data.Item.DOB,
            gender: data.Item.Gender
          })
        })
    }
    catch (err) {
      let error = '';
      let formIsValid = true;
      if (err) {
        formIsValid = false;
        error = "Cannot Read. Employee Id doesnot exist";

      }
      this.setState({
        error: error,
        id: "",
        fname: "",
        sname: "",
        email: "",
        dob: "",
        gender: ""
      });
      return formIsValid;
      console.log("Error", err)
    }
  }
  render() {

    return (
      <Container fluid='xl'>
        <Container>
          <Row><Col><h1>Employee Management</h1></Col></Row>
          <Row><Col><h6>Open Book Assignment submitted by Jennifer</h6></Col></Row>
          <Row xs="4">
            <Col md={1}><NavLink to='/'><Button size="md" md="3">Create</Button></NavLink></Col>
            <Col md={1}><NavLink to='/Read'><Button size="md" md="2">Read</Button></NavLink></Col>
            <Col md={1}><NavLink to='/Update'><Button size="md" md="2">Update</Button></NavLink></Col>
            <Col md={1}><NavLink to='/Delete'><Button size="md" md="2">Delete</Button></NavLink></Col>
          </Row>
          <Row><Alert color="light">{this.state.error}</Alert></Row>
          <h5>Read Existing Employee</h5>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup row>
              <Label for="empID" sm="2">
                Employee ID:
            </Label>
              <Col sm={3}>
                <Input placeholder="Enter Employee ID" value={this.state.id} onChange={this.handleIdChange.bind(this)} />
              </Col>
              <Button size="sm" sm="2" type="submit" onClick={this.handleValidation.bind(this)}>
                Read
            </Button>

            </FormGroup>
            <FormGroup row>
              <Label for="fname" sm="2">
                First name:
            </Label>
              <Col sm={3}>
                <Input type='text' placeholder="Enter First Name" value={this.state.fname} onChange={this.handleFnameChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="sname" sm="2">
                Sur name:
            </Label>
              <Col sm={3}>
                <Input placeholder="Enter Sur Name" value={this.state.sname} onChange={this.handleSnameChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm="2" >
                Email:
            </Label>
              <Col sm={3}>
                <Input placeholder="abc@xyz.com" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="dob" sm="2">
                Date of Birth:
            </Label>
              <Col sm={3}>
                <Input placeholder="DD/MM/YYYY" value={this.state.dob} onChange={this.handleDobChange.bind(this)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm="2">Gender:</Label>
              <Col sm={3}>
                <Input type="radio" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleGenderChange.bind(this)} /> Male
              <br />
                <Input type="radio" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleGenderChange.bind(this)} /> Female
            </Col>
            </FormGroup>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default Read;
