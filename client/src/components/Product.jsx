import React from 'react'
import styled from 'styled-components';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s all ease;
  cursor: pointer;
`

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`

const Image = styled.img`
  height: 75%;
`



const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: 0.5s all ease;
  cursor: pointer;

  &:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`

const Price = styled.p`
  font-size: 19px;
  font-weight: 500;
  color: black;
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 3px;
`

const Product = ({ item }) => {
  return (
      <Container>
        <Image src={item.img} />
        <Info>
          <Icon>
            <ShoppingCartOutlinedIcon />
          </Icon>
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
          <Icon>
            <FavoriteBorderOutlinedIcon />
          </Icon>
        </Info>
        <Price>RS {item.price}</Price>
      </Container>
   
  )
}

export default Product
