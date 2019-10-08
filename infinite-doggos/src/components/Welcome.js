import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const WelcomeContainer = styled.div`
  width: 40%;
  height: min-content;
  position: sticky;
  position: -webkit-sticky;
  top: 50%;
  left: 3%;

  @media (max-width: 700px) {
    width: 100%;
    background: white;
    top: 0;
    box-shadow: 0 4px 2px -2px gray;
  }
`;

const DogTextMain = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.1rem;
  font-family: 'Roboto Condensed', sans-serif;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 2rem;
    margin-bottom: 0.05rem;
    padding-left: 1rem;
  }
`;

const DogTextSub = styled.h3`
  font-size: 1rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 100;

  @media (max-width: 700px) {
    font-size: 0.5rem;
    padding-left: 1rem;

  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${props => props.color};
  font-size: 20px;
  transition: all 400ms ease-in-out;

  &:hover {
    cursor: pointer;
    color: grey;
    font-size: 22px;
  }

  @media (max-width: 700px) {
    display: none;
    font-size: 10px;
  }
`;

const TextInput = styled.input`
  margin-left: 0.3rem;
  display: ${props => props.showText};
  width: 70%;
  margin-bottom: 0.2rem;
  transition: 300ms;
  @media (max-width: 700px) {
    display: block;
    margin: 0;
    margin-left: 1rem;

  }
`;

const IconTextContainer = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    width: 100%;
    padding-bottom: 10px;
  }
`;

const ArrowRight = styled(FontAwesomeIcon)`
  display: ${props => props.showText};
  color: ${props => props.color};
  padding-left: 0.2rem;
  font-size: 20px;
  transition: all 400ms ease-in-out;

  &:hover {
    cursor: pointer;
    color: grey;
  }

  @media (max-width: 700px) {
    display: block;
    font-size: 10px;
    margin: 4px;
  }
`;

export default class Welcome extends Component {
  state = {
    showText: false,
    currentText: null
  };

  toggleInput() {
    this.setState({ showText: !this.state.showText });
  }

  handleTextInput(event) {
    this.setState({ currentText: event.target.value });
  }

  enterTextInput() {
    this.props.filterTextFunc(this.state.currentText);
  }

  render() {
    return (
      <WelcomeContainer>
        <DogTextMain>Welcome!</DogTextMain>
        <DogTextSub>Enjoy an endless supply of doggos.</DogTextSub>
        <IconTextContainer>
          <Icon
            icon={faFilter}
            color={'#000000'}
            onClick={this.toggleInput.bind(this)}
          />
          <TextInput
            type="text"
            placeholder="Ex. Husky"
            showText={this.state.showText ? 'block' : 'none'}
            onChange={this.handleTextInput.bind(this)}
          />
          <ArrowRight
            icon={faArrowRight}
            showText={this.state.showText ? 'block' : 'none'}
            onClick={this.enterTextInput.bind(this)}
          />
        </IconTextContainer>
      </WelcomeContainer>
    );
  }
}
