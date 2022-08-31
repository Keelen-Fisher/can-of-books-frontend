import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

const booksURL = `${process.env.REACT_APP_SERVER}`;

class BookFormModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      title: '',
      description: '',
      status: '',
    };
  }
  
  handleBookCreate = async (bookInfo) => {
    console.log(bookInfo);
    try {
      const response = await axios.post(`${booksURL}/books`, bookInfo);
      const newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook],
      })
    } catch (error) {
      console.log('error is book post: ', error.response);
    }
  }
  
  handleBookSubmit =(event) =>{
    event.preventDefault();
    this.handleBookCreate({
      title: event.target.formTitle.value,
      description: event.target.formDescription.value,
      status: event.target.formStatus.value,
    })
    }

    show = () => this.setState({ show: true })
    handleClose = () => {
      this.setState({ show: false })
    }
  
    helper = (e) => {
      this.props.handlePost(e);
      this.handleClose();
    }
  
    render() {
      return (
        <>
          <Button onClick={this.show}>Add a Book</Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="Enter Book Title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="name" placeholder="Enter Book Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control type="name" placeholder="Enter Book Status" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal>
        </>
    );
  }
}

export default BookFormModal;