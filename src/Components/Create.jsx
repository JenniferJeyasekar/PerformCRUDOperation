import React from "react";
import { Col, Form, Button, Label, Input, FormGroup, Container, Row, Alert } from "reactstrap";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import randomstring from "randomstring";
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fname: '',
      sname: '',
      email: '',
      emailError: "",
      dob: '',
      gender: ''
    }
  }
  //Handles the input changes
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
  //Handles Form validation for null values and email format
  handleValidation = () => {
    const {
      fname,
      sname,
      email,
      dob,
      gender
    } = this.state;
    console.log(fname);
    let error = '';
    let formIsValid = true;
    if (this.state.email.indexOf("@") === -1) {
      formIsValid = false;
      error = "Requires valid email";
    }
    if (!fname) {
      formIsValid = false;
      error = "First name cannot be empty";
    }
    if (!sname) {
      formIsValid = false;
      error = "Second name cannot be empty";
    }
    if (!email) {
      formIsValid = false;
      error = "Email cannot be empty";
    }
    if (!dob) {
      formIsValid = false;
      error = "DOB cannot be empty";
    }
    if (!gender) {
      formIsValid = false;
      error = "Gender must be selected";
    }

    this.setState({ error: error });
    return formIsValid;
  }
  //Loads the data into database
  handleSubmit = event => {
    event.preventDefault();
    Axios({
      method: "POST",
      url: "http://localhost:5000/create",
      params: {
        id: randomstring.generate({
          length: 3,
          charset: 'numeric'
        }),
        fname: this.state.fname,
        sname: this.state.sname,
        email: this.state.email,
        dob: this.state.dob,
        gender: this.state.gender
      },
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      const data = res.data;
      console.log(data);
      console.log("Data Added")
    });
  }
  render() {
    return (
      <Container>
        <Container fluid="xl">
          <Row><Col><h1>Employee Management</h1></Col></Row>
          <Row><Col><h6>Open Book Assignment submitted by Jennifer</h6></Col></Row>
          <Row xs="4">
            <Col md={1}><NavLink to='/'><Button size="md" md="3">Create</Button></NavLink></Col>
            <Col md={1}><NavLink to='/Read'><Button size="md" md="2">Read</Button></NavLink></Col>
            <Col md={1}><NavLink to='/Update'><Button size="md" md="2">Update</Button></NavLink></Col>
            <Col md={1}><NavLink to='/Delete'><Button size="md" md="2">Delete</Button></NavLink></Col>
          </Row>
          <Row><Alert color="light">{this.state.error}</Alert></Row>
          <Form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <Row><Col><h5>Create New Employee</h5></Col></Row>
            <FormGroup row>
              <Label for="fname" sm="2">
                First name:
            </Label>
              <Col sm={3}>
                <Input type='text' placeholder="Enter First Name" name='fname' value={this.state.fname} onChange={this.handleFnameChange.bind(this)} />

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
                <Input placeholder="abc@xyz.com" value={this.state.email} onChange={this.handleEmailChange.bind(this)}
                  errorText={this.state.emailError}
                  floatingLabelFixed />
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
            <Button size="sm" className="mr-4" type='submit' onClick={this.handleValidation.bind(this)}>
              Create
          </Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default Create;
