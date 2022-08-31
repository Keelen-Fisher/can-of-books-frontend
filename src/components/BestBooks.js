import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import DisplayBooks from './DisplayBooks.js';
import BookFormModal from './BookFormModal.js'
// import BookAddModal from './BookAddModal'

const booksURL = `${process.env.REACT_APP_SERVER}`;


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    this.getBooks();

  }

  getBooks = async() => {
    try {
      let bookData = await axios.get(`${booksURL}/books`);
      this.setState({
        books: bookData.data
      })
    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

handleBookDelete = async (bookToDelete) =>{
  try {
    const response = await axios.delete(`${booksURL}/books/${bookToDelete._id}`);
    console.log(response.status);
    const filteredBooks = this.state.books.filter(book => {
      return book._id !== bookToDelete._id
    })
    this.setState({
      books: filteredBooks
    })

    console.log()
  } catch (error) {
    console.log(error);
  }
}

updateBooks = async (bookToUpdate) => {
  try{
    let url = `${booksURL}/books/${bookToUpdate._id}`
    let updatedBook = await axios.put(url, bookToUpdate);

    let updatedBookArray = this.state.books.map(existingBook => {
      return existingBook._id === bookToUpdate._id
      ? updatedBook.data
      : existingBook
    });

    this.setState({
      books: updatedBookArray
    });

  }catch(error){
    console.log('we have an error in updateBooks: ', error.response);
  }
}

  render() {
    console.log(this.state.books);
    let books = this.state.books.map(books => (
      <>
      <p key={books._id}>{books.title} is one of my faviorite books</p>
      <button onClick={() => this.handleBookDelete(books)}>Remove from database?</button>
      <button onClick={() => this.updateBooks(books)}>Update Book?</button>
      </>
    ))

    return (
      <>

        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <BookFormModal />
        <BookFormModal />
        <div>{books}</div>
        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map((book) => {
              return (
                <Carousel.Item key={book._id}>
                  <DisplayBooks
                    title={book.title}
                    description={book.description}
                    status={book.status}>
                  </DisplayBooks>
                </Carousel.Item>
              );
            })
            }
          </Carousel>)
          :
          (<h3>Sorry, no books found!</h3>)
        }

      </>
    )
  }
}

export default BestBooks;
