import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DropdownMenu from "./DropdownMenu";
// the header should be shown at each page
const Header = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Wrapper onMouseLeave={handleMouseLeave}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            <Img src="../5.png" />
            <Title>Reservoir Cats</Title>
          </Logo>
        </Link>
        <Products>
          <Link to="/products">
            <AllProduct>All Products</AllProduct>
          </Link>
          <Categories onMouseEnter={handleMouseEnter}>Categories</Categories>
          {isHovered && <DropdownMenu />}
        </Products>
        <SubContainer>
          <Signin>Sign in</Signin>
          <Link to="/cart">
            <Cart>Cart</Cart>
          </Link>
        </SubContainer>
      </Wrapper>
    </>
  );
};
const Title = styled.h1`
  color: var(--color-accent);
`;
const Logo = styled.span`
  display: flex;
`;
const AllProduct = styled.span`
  margin-right: 10px;
`;
const Categories = styled.span``;
const Signin = styled.span`
  margin-right: 10px;
`;
const Cart = styled.span``;
const SubContainer = styled.span`
  display: flex;
  cursor: pointer;
`;
const Products = styled.span`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const Img = styled.img`
  height: 50px;
  width: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  /* font-family: Arial, Helvetica, sans-serif; */
`;

export default Header;
