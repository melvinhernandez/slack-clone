import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
      token
      refreshToken
    }
  }
`;

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [loginUser, { data, loading, error }] = useMutation(loginMutation);

  const { email, password } = form;

  const onSubmit = async (e) => {
    const response = await loginUser({
      variables: form,
    });

    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setFormErrors({ email: "", password: "" });
    } else {
      const responseErrors = {};
      errors.map(({ path, message }) => {
        responseErrors[path] = message;
      });
      setFormErrors(responseErrors);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Container text>
      <Header as="h2">Login</Header>
      <Input
        error={!!formErrors.email}
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
        fluid
      />
      <Input
        error={!!formErrors.password}
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
        fluid
      />
      <Button onClick={onSubmit}>Login</Button>
      {(formErrors.username || formErrors.email || formErrors.password) && (
        <Message
          error
          header="There were some errors with your submission"
          list={Object.keys(formErrors).map((key) => formErrors[key])}
        />
      )}
    </Container>
  );
};

export default Login;
