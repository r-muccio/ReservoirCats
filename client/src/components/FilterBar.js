import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import { ProductsContext } from "./ProductContext";

const FilterBar = ({ filters, setFilters, setFilteredArray }) => {
  const { allProducts, setAllProducts } = React.useContext(ProductsContext);
  const [company, setCompany] = React.useState(false);
  const [location, setLocation] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [companies, setCompanies] = useState(null);

  //   Creates an array of of all the body_locations in the allProducts array
  const bodyLocation = allProducts.map((product) => {
    return product.body_location;
  });
  // Creates a new Set with the bodyLocation array
  // so that we get an array with unique items
  const uniqueLocations = [...new Set(bodyLocation)];

  //  FETCHES all the company data from the database
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/companies");
      const data = await response.json();
      setCompanies(data.data);
    };
    fetchCompanies().catch(console.error);
  }, []);

  // Handles the hover state of the dropdown menus
  const handleCompanyHover = () => setCompany(!company);
  const handleLocationHover = () => setLocation(!location);
  const handleSortHover = () => setSort(!sort);

  return (
    <Wrapper>
      <Title>Shop</Title>
      <FilterWrap>
        <CompanyWrap onMouseLeave={handleCompanyHover}>
          <Company onMouseEnter={handleCompanyHover}>
            Company
            {company && <Shape />}
          </Company>
          {/* if the Company div is hovered over, the dropdown menu will show */}
          {company && (
            <CompanyDropdown>
              {companies &&
                companies.map((brand) => {
                  return (
                    <Item
                      key={brand._id}
                      onClick={() =>
                        setFilters({
                          ...filters,
                          brand: brand._id,
                          isFiltering: true,
                        })
                      }
                    >
                      {brand.name}
                    </Item>
                  );
                })}
            </CompanyDropdown>
          )}
        </CompanyWrap>
        <LocationWrap onMouseLeave={handleLocationHover}>
          <BodyLocation onMouseEnter={handleLocationHover}>
            Body Location {location && <Shape />}
          </BodyLocation>
          {/* if the BodyLocation div is hovered over, the dropdown menu will show */}
          {location && (
            <LocationDropdown>
              {uniqueLocations.map((location) => {
                return (
                  <Item
                    key={location}
                    onClick={(event) =>
                      setFilters({
                        ...filters,
                        location: event.target.innerHTML,
                        isFiltering: true,
                      })
                    }
                  >
                    {location}
                  </Item>
                );
              })}
            </LocationDropdown>
          )}
        </LocationWrap>
        <SortWrap onMouseLeave={handleSortHover}>
          <Sort onMouseEnter={handleSortHover}>Sort {sort && <Shape />}</Sort>
          {/* if the Sort div is hovered over, the dropdown menu will show */}
          {sort && (
            <SortDropdown>
              <Item
                onClick={() =>
                  setFilters({ ...filters, sortBy: 0, isFiltering: true })
                }
              >
                By Price: Low to High
                {/* Under $100 */}
              </Item>
              <Item
                onClick={() =>
                  setFilters({ ...filters, sortBy: 1, isFiltering: true })
                }
              >
                By Price: High to Low
                {/* Over $100 */}
              </Item>
            </SortDropdown>
          )}
        </SortWrap>
        <Clear
          onClick={() => {
            setFilters({
              isFiltering: false,
              brand: null,
              location: null,
              sortBy: null,
            });
            setFilteredArray([]);
          }}
        >
          Clear!
        </Clear>
      </FilterWrap>
    </Wrapper>
  );
};

export default FilterBar;

const dropdownAnimation = keyframes`
0% {
    transform: rotateX(-90deg);
}
70% {
transform: rotateX(20deg)
}
100% {
transform: rotateX(0deg)
}
`;

const arrowSpin = keyframes`
0% {
    transform: rotateZ(-180deg);
}
100% {
    transform: rotateZ(0deg);
}

`;

const Wrapper = styled.div`
  box-shadow: 0 10px 5px -5px lightgrey;
  display: flex;
  flex-direction: column;
  padding: 20px 0 55px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: var(--color-secondary);
  display: flex;
  font-size: 2.5rem;
  justify-content: center;
  padding-bottom: 30px;
`;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-family: var(--font-body);
`;

const Company = styled.div`
  border-bottom: 3px solid var(--color-primary);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  padding: 10px 0;
  width: 25vw;

  &:hover {
    background-color: lightgrey;
  }
`;

const Shape = styled.div`
  background-color: black;
  clip-path: polygon(50% 46%, 0 0, 100% 0);
  height: 10px;
  margin: 10px 0 0 15px;
  width: 10px;

  animation: ${arrowSpin} 400ms ease-in-out;
`;

const CompanyWrap = styled.div``;

const CompanyDropdown = styled.div`
  box-shadow: -7px 5px 5px lightgrey, 7px 5px 5px lightgrey;
  background-color: white;
  border-radius: 10px;
  max-height: 35vh;
  overflow: scroll;
  position: absolute;
  width: 25vw;
  z-index: 10;

  animation: ${dropdownAnimation} 800ms ease-in-out forwards;
  transform-origin: top center;
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  &:hover {
    background-color: lightgrey;
  }
`;

const LocationWrap = styled.div``;

const BodyLocation = styled.div`
  border-bottom: 3px solid var(--color-primary);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  padding: 10px 0;
  text-align: center;
  width: 25vw;

  &:hover {
    background-color: lightgrey;
  }
`;

const LocationDropdown = styled.div`
  box-shadow: -7px 5px 5px lightgrey, 7px 5px 5px lightgrey;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  width: 25vw;
  z-index: 10;

  animation: ${dropdownAnimation} 800ms ease-in-out forwards;
  transform-origin: top center;
`;

const SortWrap = styled.div``;

const Sort = styled.div`
  border-bottom: 3px solid var(--color-primary);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  padding: 10px 0;
  text-align: center;
  width: 25vw;

  &:hover {
    background-color: lightgrey;
  }
`;

const SortDropdown = styled.div`
  box-shadow: -7px 5px 5px lightgrey, 7px 5px 5px lightgrey;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  width: 25vw;
  z-index: 10;

  animation: ${dropdownAnimation} 800ms ease-in-out forwards;
  transform-origin: top center;
`;

const Clear = styled.button`
  background-color: var(--color-secondary);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  padding: 0 40px;

  &:hover {
    background-color: white;
    box-shadow: 0 0 10px grey;
    color: var(--color-primary);
  }
`;
