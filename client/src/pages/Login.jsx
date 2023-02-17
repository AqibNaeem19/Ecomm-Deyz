import React, { useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url('https://images.pexels.com/photos/5650049/pexels-photo-5650049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center fixed;
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
  width: 25%;
  background-color: #f4f8f5;
  box-shadow: 1px 1px 3px 1px #000;
  border-radius: 20px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 5px;
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
  transition: .5s all;
`

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  text-align: right;
`

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordToggler = (event) => {
    setShowPassword(event.target.checked)
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input placeholder="Email" />
          <Input placeholder="Password"
            type={`${showPassword ? 'text' : 'password'}`}
          />
          <div style={{ margin: "0px 10px 15px 0px", padding: "0px" }}>
            <input style={{ width: "12px", height: "12px", cursor: "pointer" }}
              type="checkbox"
              name="password"
              value="show"
              onChange={passwordToggler}
            />
            <label style={{ fontSize: "12px" }}
              htmlFor="password">
              {" "}Show Password
            </label>
          </div>
          <Button>Login</Button>
          <Link>Forgot your password?</Link>
          <Link>Don't have an Account</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
