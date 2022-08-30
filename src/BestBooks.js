import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import DisplayBooks from './DisplayBooks.js';

const booksURL = `https://can-of-books-keelen-rob.herokuapp.com`;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      noBooks: false
    }
  }

  componentDidMount() {
    this.getBooks();

  }
  getBooks = () => {
    axios.get(`${booksURL}/books`).then(response => {
      this.setState({
        books: response.data
      });
      if (response.data.length === 0) {
        this.setState({
          noBooks: true
        });
      }
      else this.setState({ noBooks: false })
    }
    )
  };

  render() {

    /* TODO: render all the books in a Carousel */
    // let carouselItems = this.state.books.map((info, index) => (
    // <Carousel>
    {/* <Carousel.Item> */ }
    {/* <Carousel.Caption > */ }
    {/* <h3>{info.title}</h3> */ }
    {/* <p>{info.description}</p> */ }
    {/* <p>{info.status}</p> */ }
    {/* </Carousel.Caption> */ }
    {/* </Carousel.Item> */ }
    {/* </Carousel> */ }
    // ));

    return (
      <>

        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
      // <p>Book Carousel coming soon</p>
      // ) : (
      // <h3>No Books Found :(</h3>
      // )}
    )
  }
}

export default BestBooks;
