import React from "react";

import styled from "styled-components";
import { keyframes } from "styled-components";

const DropdownMenu = () => {
  return (
    <>
      <Wrapper>
        <LifeStyle>
          <Img src="../2.png" />
          <Text>Lifestyle</Text>
        </LifeStyle>
        <Fitnes>
          <Img src="../6.png" />
          <Text>Fitness</Text>
        </Fitnes>
        <Medical>
          <Img src="../3.png" />
          <Text>Medical</Text>
        </Medical>
        <Entertainment>
          <Img src="../1.png" />
          <Text>Entertainment</Text>
        </Entertainment>
      </Wrapper>
    </>
  );
};

export default DropdownMenu;

const dropdownAnimation = keyframes`
0% {height: 0; opacity: 0;}
100% {height: 30vh; opacity: 1;}
`;

const Wrapper = styled.div`
  background-color: white;
  box-shadow: 0px 15px 16px -15px rgba(0, 0, 0, 1);
  display: flex;
  left: 0;
  position: absolute;
  top: 60px;
  width: 100%;
  z-index: 5;
  animation-name: ${dropdownAnimation};
  animation-duration: 2s;
`;

const LifeStyle = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Fitnes = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Medical = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Entertainment = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Img = styled.img`
  /* border: 1px solid white; */
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled.h2`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 15px 0;
  text-align: center;
  z-index: 10;
  bottom: 0;
  position: absolute;
  width: 25vw;
`;
