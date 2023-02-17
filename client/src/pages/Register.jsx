import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url('https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: #f3f3f4;
  box-shadow: 1px 1px 4px 1px #000;
  border-radius: 20px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 5px;
`

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 50px;
  &:hover {
    filter: brightness(120%);
  }
`

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form>
          <Input placeholder="Name" />
          <Input placeholder="Last name" />
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
          <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLOCY</b></Agreement>
          <Button>Register</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register;

