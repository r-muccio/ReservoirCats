import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductContext";
import { CartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ConfirmationPage from "./ConfirmationPage";

const Cart = () => {
  let navigate = useNavigate();
  const [creditCard, setCreditCard] = useState(null);
  const [ccv, setCcv] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [_id, set_id] = useState(null);
  const { allProducts } = React.useContext(ProductsContext);
  const { cartState, addToCart, removeFromCart, resetCart, setInfo } =
    useContext(CartContext);

  // Could not render product image from CartState
  // This function allows each CartItem to grab product image from allProducts
  function findProductImg(product) {
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i]._id === product._id) {
        return allProducts[i].imageSrc;
      }
    }
  }
  // this function will post to mongo DB the info put in by the user in the form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let data = {
      items: cartState.items,
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      creditCard: creditCard,
      ccv: ccv,
    };

    const update = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.items),
    };
    const updateStock = async () => {
      // console.log("here");
      try {
        const response = await fetch("/products", update);
        const updated = await response.json();
        // console.log("hello", updated);
      } catch (err) {
        console.log(err);
      }
    };
    updateStock();

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    //this part of the function will the info to the confimation page
    const postOrder = async () => {
      try {
        const response = await fetch("/purchases", settings);
        const data = await response.json();
        setInfo(data.data);

        navigate("/confirmation");
      } catch (err) {
        console.log(err);
      }
    };
    postOrder();
  };
  if (cartState.items.length > 0) {
    return (
      <>
        <Wrapper>
          <CartHeading>Your Items</CartHeading>
          <ItemsWrapper>
            {cartState.items.map((el) => {
              return (
                <CartItem id={el._id} key={el._id}>
                  <ProductImg src={findProductImg(el)} />
                  <InfoBox>
                    <ProductInfo>
                      <span>{el.name}</span>
                      <span>Price: {el.price}</span>

                      <span>
                        {el.stock > 0
                          ? `${el.stock} in stock`
                          : "Item is out of stock"}
                      </span>
                      <span>Quantity in cart: {el.quantityInCart}</span>
                    </ProductInfo>
                    <ButtonDiv>
                      <Button
                        onClick={() => {
                          addToCart({
                            _id: el._id,
                            // name: el.name,
                            // price: el.price,
                            // stock: el.numInStock,
                            // quantityInCart: el.quantityInCart,
                            // companyId: el.companyId,
                            // body_location: el.body_location,
                            // category: el.category,
                            // img: el.imageSrc,
                          });
                        }}
                      >
                        Add one
                      </Button>
                      <Button
                        onClick={() => {
                          removeFromCart({
                            _id: el._id,
                          });
                        }}
                      >
                        Remove one
                      </Button>
                    </ButtonDiv>
                  </InfoBox>
                </CartItem>
              );
            })}
          </ItemsWrapper>
          <PurchaseForm onSubmit={handleFormSubmit}>
            <h3>Customer Information</h3>
            <TextArea
              type="text"
              name="first-name"
              placeholder="First Name"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <TextArea
              type="text"
              name="last-name"
              placeholder="Last Name"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <TextArea
              type="text"
              name="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextArea
              type="text"
              name="address"
              placeholder="Address"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            <TextArea
              type="text"
              name="credit-card-number"
              placeholder="Card Number"
              onChange={(event) => {
                setCreditCard(event.target.value);
              }}
            />
            <TextArea
              type="text"
              name="ccv"
              placeholder="CCV"
              onChange={(event) => {
                setCcv(event.target.value);
              }}
            />
            <FormParagraph>
              Please review your cart before placing your order.
            </FormParagraph>
            <FormParagraph>
              Out-of-stock items will be placed on backorder, and payment will
              be collected upon placing order.
            </FormParagraph>
            <Link to="/confirmation">
              <SubmitButton
                type="submit"
                value="Click here to place your order."
                onClick={handleFormSubmit}
              />
            </Link>
            <ResetCartButton onClick={resetCart}>Reset cart</ResetCartButton>
          </PurchaseForm>
        </Wrapper>
      </>
    );
  } else {
    return (
      <EmptyCartMessage>
        <h3>Your cart is empty</h3>
      </EmptyCartMessage>
    );
  }
};

export default Cart;

const InfoBox = styled.div`
  display: block;
`;
const EmptyCartMessage = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
  transform: (translate(-50%, -50%));
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  margin-left: 25%;
  top: 10%;
  width: 50%;
  transform: translateX(-50%);
  margin-top: 5vh;
  /* @media (max-width: 1439px) {
    left: 50%;
    transform: translateX(-50%);
  } */
`;
const CartHeading = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2em;
  font-family: var(--font-body);
`;
const ItemsWrapper = styled.div`
  display: block;
  width: 50%;
`;
const CartItem = styled.div`
  flex: 49%;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-right: 5px;
`;
const ProductImg = styled.img`
  width: 120px;
  margin-right: 10px;
  margin-left: 50px;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonDiv = styled.div`
  margin-top: 30px;
  width: 350px;
  display: flex;
  justify-content: space-around;
  align-items: space-around;
`;
const PurchaseForm = styled.form`
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  margin-left: 50%;
  padding-top: 30px;

  height: 400px;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 1440px) {
    width: 330px;
    height: 400px;
    position: fixed;
    flex-direction: column;
    justify-content: space-around;
    right: -23vw;
    top: 10vh;
  }
`;
const TextArea = styled.input`
  width: 250px;
`;
const FormParagraph = styled.p`
  align-self: flex-start;
  margin-left: 10px;
`;
const SubmitButton = styled.input`
  width: 200px;
  height: 30px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
`;
const Button = styled.button`
  width: 130px;
  height: 30px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
`;
const ResetCartButton = styled.button`
  width: 200px;
  height: 30px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
`;
