import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleImage from './SingleImage';
import loader from '../static/loader.gif';
import styled from 'styled-components';
import allBreeds from '../static/breeds.json';

const Container = styled.div`
  width: 55%;
  padding-left: 5%;
  @media (max-width: 700px) {
    width: 100%;
    padding: 1px;
  }
`;

const Loader = (
  <center>
    <img src={loader} alt="Please wait for more dogs..." />
  </center>
);

export default class Images extends Component {
  baseLink = 'https://dog.ceo/api/breeds/image/random/30';
  // Initialize the state with an empty list of
  // images, and the link for random breeds
  state = {
    images: [],
    fetchLink: this.baseLink
  };

  // Fetches everytime the end of the current fetch has been reached.
  fetch() {
    fetch(this.state.fetchLink).then(res =>
      res.json().then(obj => {
        const newLinks = obj.message.filter(link => {
          // Checks if each of the links from the recent fetch
          // is already displayed (in our images array)
          if (this.state.images.includes(link)) {
            // Logs a repeat in the browser.:
            console.log(`Filtered out repeat: - ${link}`);
          }
          return !this.state.images.includes(link);
        });
        this.setState({
          images: this.state.images.concat(newLinks)
        });
      })
    );
  }

  // Makes the initial fetch for random breeds
  componentDidMount() {
    // Fetching the images from the API
    fetch(this.state.fetchLink).then(res =>
      res.json().then(obj => {
        this.setState({
          images: this.state.images.concat(obj.message)
        });
      })
    );
  }

  // When a new breed is received from the Welcome component, it is processed.
  componentWillReceiveProps() {
    const givenText = this.props.filterText;

    // If new search is valid:
    if (allBreeds[givenText] != null) {
      const updatedLink = `https://dog.ceo/api/breed/${givenText}/images/random/30`;
      // Empties current list of images and updates the link
      this.setState({ images: [], fetchLink: updatedLink });
      // Fetches images from new link.
      this.fetch();
    }
  }

  render() {
    return (
      <Container>
        <center>
          <InfiniteScroll
            dataLength={this.state.images.length}
            next={this.fetch.bind(this)}
            hasMore={true}
            loader={Loader}
          >
            {this.state.images.map(link => {
              return <SingleImage link={link} key={link} />;
            })}
          </InfiniteScroll>
        </center>
      </Container>
    );
  }
}
