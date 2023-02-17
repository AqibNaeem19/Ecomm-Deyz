import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 60vh;
  position: relative;
  &:hover {
    opacity: 0.75;
  };
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
`

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 2px #000000;
`

const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  background-color: white;
  color: gray;
  font-weight: 600;
  letter-spacing: 1px;
`

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/products/${item.cat}`}>
          <Button>Shop me</Button>
        </Link>

      </Info>
    </Container>
  )
}

export default CategoryItem
