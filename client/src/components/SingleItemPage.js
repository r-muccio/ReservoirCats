import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartContext";

// this page will show a single item selected from the Homepage.
const SingleItemPage = () => {
  const { cartState, addToCart } = useContext(CartContext);
  const [add, setAdd] = useState("Add to cart");
  const { _id } = useParams();
  const [items, setItems] = useState(null);

  // console.log({cartState});

  useEffect(() => {
    const findItem = async () => {
      const response = await fetch(`/products/${_id}`);
      const data = await response.json();

      setItems(data.data);
    };
    findItem();
  }, []);
  if (!items) {
    return <div>...loading</div>;
  }
  // console.log(items);
  return (
    <>
      <Wrapper>
        <Img src={items.imageSrc} />
        <SubContainer>
          <Name>{items.name}</Name>
          <Price>{items.price}</Price>
          <Stock>we have {items.numInStock} in stock act fast!!</Stock>
          {/* checks to see if the item is in stock, if not, the button is 
          greyed out and disabled */}
          {items.numInStock ? (
            <Button
              onClick={() => {
                addToCart({
                  _id: items._id,
                  name: items.name,
                  price: items.price,
                  stock: items.numInStock,
                  companyId: items.companyId,
                  body_location: items.body_location,
                  category: items.category,
                  img: items.imageSrc,
                });
                setAdd("Added to your cart");
                console.log({ cartState });
              }}
            >
              {add}
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "var(--color-primary)",
                cursor: "not-allowed",
              }}
            >
              Out of Stock
            </Button>
          )}
        </SubContainer>
      </Wrapper>
    </>
  );
};

const Button = styled.button`
  width: 50%;
  padding: 10px 0;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  /* font-family: Arial, Helvetica, sans-serif; */
`;

const Img = styled.img`
  height: 40%;
`;

const SubContainer = styled.div`
  background-color: var(--color-accent);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
  padding: 5%;
  width: 40vw;
`;

const Name = styled.h2`
  color: white;
  font-size: 2.5rem;
`;

const Price = styled.p`
  color: white;
  font-size: 1.5rem;
  padding-top: 10px;
`;

const Stock = styled.p`
  color: white;
  padding: 60px 0 10px;
`;

export default SingleItemPage;
