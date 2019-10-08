import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 25vw;
  max-height: 100%;
  margin: 10px;
`;

export default function SingleImage({ link }) {
  return <Image src={link} alt=""/>;
}
