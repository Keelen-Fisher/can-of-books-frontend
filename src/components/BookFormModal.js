import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const booksURL = `${process.env.REACT_APP_SERVER}`;

class BookFormModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
      bookIdToDelete: ''
    };
  }

  handleTitleInput(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleDescriptionInput(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleStatusInput(event) {
    this.setState({
      status: event.target.value
    });
  }

  handleBookSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.handleBookCreate(this.state);
    }

  handleBookCreate = async (bookInfo) => {
    console.log(bookInfo);
    try {
      const response = await axios.post(`${booksURL}, bookInfo`);
      const newBook = response.data;
      const books = [...this.state.books, newBook];
      this.setState({ books });
    } catch (error) {
      console.log('error is book post: ', error.response);
    }
  }

  handleBookDelete = async (bookToDelete) =>{
    try {
      //make axios.delete request
      const response = await axios.delete(`${booksURL}/cats/${bookToDelete._id}`);
      // console.log response.data
      console.log(response.status);
      // .filter on the front end
      const filteredBooks = this.state.books.filter(book => {
        return book._id !== bookToDelete._id
      })
      // .setState with filtered books
      this.setState({
        books: filteredBooks
      })
  
      console.log()
    } catch (error) {
      console.log(error);
    }
  }

  render () {

    return(
      <Form onSubmit={this.handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Title</Form.Label>
        <Form.Control type="title" placeholder="Enter Book Title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formColor">
        <Form.Label>Description</Form.Label>
        <Form.Control type="name" placeholder="Enter Book Description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Status</Form.Label>
        <Form.Control type="name" placeholder="Enter Book Status" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    );
  }

}

export default BookFormModal;