import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


class DisplayBooks extends React.Component {

  render() {

    return (
      <>
        <Carousel.Caption style={{ paddingBottom: '30%', fontSize: '5rem' }}>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <p>{this.props.status}</p>
        </Carousel.Caption>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/e/e4/Interior_view_of_Stockholm_Public_Library.jpg'
          alt='Placeholder'
          style={{ width: '100%', }}
        />
      </>
    )
  }
}

export default DisplayBooks;