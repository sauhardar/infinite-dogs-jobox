import React, { Component } from 'react';
import Images from './components/Images';
import Welcome from './components/Welcome';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default class App extends Component {
  state = {
    filterText: null
  };

  onChangeFilterText = newText => {
    this.setState({ filterText: newText });
  };

  render() {
    return (
      <Container>
        <Welcome filterTextFunc={this.onChangeFilterText.bind(this)} />
        <Images filterText={this.state.filterText} />
      </Container>
    );
  }
}
