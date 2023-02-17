import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
`

const Announcement = () => {
  return (
    <Container>
      Super Deals! Free shipping on orders over $50
    </Container>
  )
}

export default Announcement;
