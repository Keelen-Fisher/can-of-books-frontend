import React from 'react ';
import { Container, Button, Form } from 'react-bootstrap';

class UpdateBookForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();


    let bookToUpdate = {
      title: e.target.title.value || this.props.book.title,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.value || this.props.status,
      _id: this.props.book._id,
      _v: this.props.book._v
    }

    this.props.updateBooks(bookToUpdate);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleBookSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title of Book</Form.Label>
            <Form.Control type="title" placeholder={this.props.book.title} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="name" placeholder={this.props.book.description} />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control type="name" placeholder={this.props.book.status} />
          </Form.Group>
          <Button type="submit">Update Book</Button>
        </Form>
      </Container>

    )
  }

}






export default UpdateBookForm;