import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import DisplayBooks from './DisplayBooks.js';
// import { AccordionCollapse } from 'react-bootstrap';
import BookFormModal from './components/BookFormModal.js'

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

// --------------------- get books refactored to above code ----------------------------
  // getBooks = () => {
  //   axios.get(`${booksURL}/books`).then(response => {
  //     this.setState({
  //       books: response.data
  //     });
  //     if (response.data.length === 0) {
  //       this.setState({
  //         noBooks: true
  //       });
  //     }
  //     else this.setState({ noBooks: false })
  //   }
  //   )
  // }
// --------------------- get books refactored to above code ----------------------------


///////// In class demo handle create

//   handleBookCreate = async (bookInfo) => {
//     console.log(bookInfo);
//     try {
//       const response = await axios.post(`${booksURL}, bookInfo`);
//       const newBook = response.data;
//       const books = [...this.state.books, newBook];
//       this.setState({ books });
//     } catch (error) {
//       console.log('error is book post: ', error.response);
//     }
//   }


// ///////// In class demo handle delete

handleBookDelete = async (bookToDelete) =>{
  try {
    //make axios.delete request
    const response = await axios.delete(`${booksURL}/books/${bookToDelete._id}`);
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


////////////

  render() {
    console.log(this.state.books);
    let books = this.state.books.map(books => (
      <>
      <p key={books._id}>{books.title} is one of my faviorite books</p>
      <button onClick={() => this.handleBookDelete(books)}>Remove from database?</button>
      </>
    ))

    return (
      <>

        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
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
