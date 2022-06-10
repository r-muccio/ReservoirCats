import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import { Link } from "react-router-dom";

import { ProductsContext } from "./ProductContext";
import { CartContext } from "./CartContext";
import FilterBar from "./FilterBar";

const AllProduct = () => {
  const { allProducts } = useContext(ProductsContext);
  const { cartState, addToCart } = useContext(CartContext);
  const [add, setAdd] = useState("Add to cart");
  const [filteredArray, setFilteredArray] = useState([]);
  const [filters, setFilters] = useState({
    isFiltering: false,
    brand: null,
    location: null,
    sortBy: null,
  });

  // Sorting helper functions
  // will reformat the price into a plain interger and sort by ascending
  const sortByAsc = (array) => {
    array.sort(function (a, b) {
      let x = a.price.slice(1).replace(/,/g, "");
      let y = b.price.slice(1).replace(/,/g, "");
      return parseInt(x) - parseInt(y);
    });
    return array;
  };
  // will reformat the price into a plain interger and sort by decending
  const sortByDec = (array) => {
    array.sort(function (a, b) {
      let x = a.price.slice(1).replace(/,/g, "");
      let y = b.price.slice(1).replace(/,/g, "");
      return parseInt(x) - parseInt(y);
    });
    return array.reverse();
  };

  useEffect(() => {
    // This will filter through the allProducts array and return the products
    // that match with the filter brand.
    // Is called every time the filter updates
    if (filters.brand) {
      let array = filteredArray.length > 0 ? filteredArray : allProducts;
      setFilteredArray(
        array.filter((product) => product.companyId === filters.brand)
      );
    }
    // filters the body location
    if (filters.location) {
      let array = filteredArray.length > 0 ? filteredArray : allProducts;
      setFilteredArray(
        array.filter((product) => product.body_location === filters.location)
      );
    }

    if (filters.sortBy === 0) {
      // have to use a spread operator to copy an array
      // otherwise it will BE the array
      let copy = [...allProducts];
      // if the filteredArray exists then use the filteredArray, otherwise use the copy of the allProducts array
      let array = filteredArray.length > 0 ? filteredArray : copy;
      setFilteredArray(sortByAsc(array));
    }

    if (filters.sortBy === 1) {
      // have to use a spread operator to copy an array
      // otherwise it will BE the array
      let copy = [...allProducts];
      // if the filteredArray exists then use the filteredArray, otherwise use the copy of the allProducts array
      let array = filteredArray.length > 0 ? filteredArray : copy;
      setFilteredArray(sortByDec(array));
    }
  }, [filters]);

  if (!allProducts) {
    return <div>...loading</div>;
  }
  function handleClickDetails(event) {
    event.stopPropagation();
  }

  //   const handleAddtoCartClick = () => {
  // cartState.
  //   }

  // map to display all products
  const renderItem = (array) => {
    return array.map((product) => {
      return (
        <Wrapper key={product._id}>
          <WidthControl>
            {cartState &&
              cartState.items.map((item) =>
                item._id == product._id ? (
                  <InCart key={item._id}>Added to cart!</InCart>
                ) : (
                  ""
                )
              )}
            <Link to={`/products/${product._id}`} onClick={handleClickDetails}>
              <ProductImg src={product.imageSrc} />
            </Link>
            <SubContainer>
              <NameDiv>
                <h2> {product.name}</h2>
              </NameDiv>
              <InfoPar>{product.price}</InfoPar>

              <InfoPar>
                {product.numInStock ? (
                  <span>{product.numInStock} in stock</span>
                ) : (
                  <span>out of stock</span>
                )}
              </InfoPar>
            </SubContainer>
            {/* checks to see if the item is in stock, if not, the button is 
          greyed out and disabled */}
            {product.numInStock ? (
              <Button
                id={product._id}
                className="unclicked"
                onClick={() => {
                  addToCart({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    stock: product.numInStock,
                    quantityInCart: 1,
                    companyId: product.companyId,
                    body_location: product.body_location,
                    category: product.category,
                    img: product.imageSrc,
                  });
                  // setAdd("Added to your cart");
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
          </WidthControl>
        </Wrapper>
      );
    });
  };

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        setFilteredArray={setFilteredArray}
      />
      {filteredArray.length === 0 && filters.isFiltering && (
        <>
          <h2>No Products Found</h2>{" "}
          <p>Please press the clear button and try again</p>{" "}
        </>
      )}
      <ItemWrapper>
        {/* will render either the allProducts array or the filtered array */}
        {filters.isFiltering
          ? renderItem(filteredArray)
          : renderItem(allProducts)}
      </ItemWrapper>
    </>
  );
};

const slideIn = keyframes`
0% {
  opacity: 0;
  transform: scale(50%);
}
75% {
  transform: scale(110%);
}
100% {
  opacity: 1;
  transform: scale(100%);
}
`;

const WidthControl = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const InCart = styled.div`
  background-color: var(--color-accent);
  border-radius: 5px;
  color: white;
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 10px;
  position: absolute;

  animation: ${slideIn} 400ms ease-in-out;
`;

// const ImgLink = styled(Link)`
//   display: flex;
//   align-self: center;
//   justify-content: center;
// `;
const ProductImg = styled.img`
  height: 190px;
  /* align-self: center;
  justify-self: center; */
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 40%; */
`;

const NameDiv = styled.div`
  padding: 30px 0 0px 0;
  height: 80px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  align-items: baseline;
`;

const InfoPar = styled.p`
  margin-bottom: 5px;
`;
const Button = styled.button`
  width: 200px;
  height: 30px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
  align-self: center;
  /* justify-self: center; */
`;
const Wrapper = styled.div`
  display: flex;
  align-items: space-between;
  flex-direction: column;
  border-radius: 5px;
  margin: 30px 15px 0px 15px;
  padding: 25px 15px 5px 15px;
  /* Box shadow - secondary colour */
  box-shadow: 0 2px 4px 1px rgba(219, 198, 173, 0.4),
    0 4px 4px 1px rgba(219, 198, 173, 0.4),
    -1px -1px 2px 1px rgba(219, 198, 173, 0.4);

  /* Box-shadow - primary colour */
  /* box-shadow: 0 2px 4px 1px rgba(147, 147, 143, 0.2), 0 4px 4px 1px rgba(147, 147, 143, 0.2), -1px -1px 2px 1px rgba(147, 147, 143, 0.2); */
`;
const SubContainer = styled.div`
  display: block;
  margin: 0px 0 0 25px;
  height: 170px;
`;

export default AllProduct;
