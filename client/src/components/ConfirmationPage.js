import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { ProductsContext } from "./ProductContext";

// after you make a purchase you will be automatically redirected to this page
const ConfirmationPage = () => {
  const { cartState, info } = useContext(CartContext);
  const { allProducts, setAllProducts } = useContext(ProductsContext);

  // need to re fetch the products frrom the data base so that the
  // updated stock amount is shown on the products page
  const handleClick = async () => {
    const response = await fetch(`/products`);
    const data = await response.json();
    setAllProducts(data.data);
  };

  return (
    <>
      <Container>
        <Img src="../5.png" />
        <SubContainer>
          <Wrapper>
            <Title>Thank you for your purchase </Title>
            <Info>
              <Bold>Confirmation number: </Bold>
              {info._id}
            </Info>
            <Info>
              <Bold> Items purchased: </Bold>
            </Info>
            {/* we are doing a map here so that if the user buys more than one item it will show all of them */}
            {cartState.items.map((item) => {
              return (
                <ItemWrapper key={item._id}>
                  <ItemContainer>
                    <span style={{ color: "black" }}>{item.name}</span>
                  </ItemContainer>
                </ItemWrapper>
              );
            })}
            <Info>
              <Bold>Name: </Bold>
              {info.firstName} {info.lastName}
            </Info>
            <Info>
              <Bold>Address </Bold>
              {info.address}
            </Info>
            <Info>
              <Bold>A confirmation email was sent to:</Bold>
              {info.email}
            </Info>
          </Wrapper>
        </SubContainer>
        <Img src="../1.png" />
      </Container>
      <BtnContainer>
        <Link
          to="/products"
          style={{ textDecoration: "none" }}
          onClick={handleClick}
        >
          <Button>Go back to shopping</Button>
        </Link>
      </BtnContainer>
    </>
  );
};

const ItemWrapper = styled.div``;
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  width: 550px;
  height: 50px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 100px;
  border: solid 1px #6d807b;
  padding: 20px;
  border-radius: 10px;
`;

const Img = styled.img`
  height: 150px;
  width: 150px;
`;
const Info = styled.span`
  display: flex;
  margin-top: 30px;
  color: black;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Bold = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 30px;
`;

export default ConfirmationPage;
