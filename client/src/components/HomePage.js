import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const HomePage = () => {
  return (
    <>
      <Wrapper>
        <Title>welcome</Title>
        <Container>
          <Img1 src="../1.png" />
          <Img2 src="../2.png" />
          <Img3 src="../5.png" />
          <Img3 src="../3.png" />
          <Img2 src="../6.png" />
          <Img1 src="../4.png" />
        </Container>
        <SubContainer>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button>Start to shop</Button>
          </Link>
        </SubContainer>
      </Wrapper>
    </>
  );
};
const animation = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity:1;
    }`;

const Img1 = styled.img`
  animation: ${animation};
  animation-duration: 4s;
`;
const Img2 = styled.img`
  animation: ${animation};
  animation-duration: 8s;
`;
const Img3 = styled.img`
  animation: ${animation};
  animation-duration: 10s;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div``;
const Title = styled.h1`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  width: 300px;
  height: 50px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
`;

export default HomePage;
