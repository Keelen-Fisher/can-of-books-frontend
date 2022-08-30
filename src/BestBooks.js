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
    )
  }
}

export default BestBooks;
