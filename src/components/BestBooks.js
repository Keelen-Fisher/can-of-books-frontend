import React from 'react';
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";
import BookFormModal from "./BookFormModal"
import EditForm from './UpdateBook';
import '../Styles/Styles.css'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      showUpdateForm: false,
      selectedBook: null,
    };
  }

  addBooks = async (event) => {
    event.preventDefault()
    this.hideModal()
    let book = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
    }
    try {
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, book)
      let newBook = response.data
      this.setState({
        books: [...this.state.books, newBook]
      });
    } catch (error) {
      console.log('error posting', error)
    }
  }

  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);

      this.setState({ books: bookData.data });
    } catch (error) {
      console.log("Error retrieving books: ", error.response);
    }

  };

  componentDidMount() {
    this.getBooks();
  }

  showModal = () => {
    this.setState({
      show: true
    })
  }

  hideModal = () => {
    this.setState({
      show: false
    })
  }
  deleteBook = async (bookId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookId}`);
      let newBooks = this.state.books.filter((value, index) => {
        if (value._id === bookId) {
          return false;
        } else { return true; }
      })
      this.setState({
        books: newBooks,
      })
      
    } catch (error) {
      console.log('error deleting', error)
    }

  }

  updateBooks = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate);

      let updatedBookArray = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook
      });
      this.setState({
        books: updatedBookArray,
      });
    } catch (error) {
      console.log('error deleting', error)
    }
  }

  setBook = function (book) {
    this.setState({
      selectedBook: book,
      showUpdateForm: true,
    })
  }

  render() {
    let books = this.state.books.map((value, index) => {
      return (
        <Carousel.Item key={index} className='carouselItem'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/e/e4/Interior_view_of_Stockholm_Public_Library.jpg'
            alt='Placeholder'
            style={{ width: '100%'}}
          />
          <Carousel.Caption style={{ marginBottom: '500px', marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'rgba(32, 31, 32, 0.85)', border: 'solid black 2px', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px', width: '50%'}}>
            <h3 style={{fontSize: '4rem'}}>{value.title}</h3>
            <p>{value.description}</p>
            <p>{value.status}</p>
            <Button style={{ margin: 'auto', width: '120px', backgroundColor: 'rgba(32, 31, 32, 0.85)', border: 'solid red 2px' }} onClick={() => this.deleteBook(value._id)}>Delete</Button>
            <Button style={{ marginLeft: '3rem', width: '120px', backgroundColor: 'rgba(32, 31, 32, 0.85)' , border: 'solid green 2px'   }} onClick={() => this.setBook(value)} >Update Book</Button>
          </Carousel.Caption>
        </Carousel.Item>
      )
    })
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button style={{ marginLeft: '3rem', width: '120px', backgroundColor: 'green' , border: 'solid green 2px'   }} onClick={this.showModal}>Add a book</Button>
        <BookFormModal addBooks={this.addBooks} show={this.state.show} onHide={this.hideModal} />
        {this.state.selectedBook &&
          <EditForm book={this.state.selectedBook} updateBooks={this.updateBooks} />
        }
        {this.state.books.length ? (
          <Carousel className="w-100">
            {books}
          </Carousel>
        ) : (
          <h3>No Books Found</h3>
        )}
      </>
    );
  }
}

export default BestBooks;

