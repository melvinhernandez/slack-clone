import React, { useState } from "react";
import { Container, Header, Input, Button } from "semantic-ui-react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerUser, { data, loading, error }] = useMutation(
    registerMutation
  );

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const response = await registerUser({
      variables: form,
    });
  };

  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={updateField}
        fluid
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={updateField}
        fluid
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={updateField}
        fluid
      />
      <Button onClick={onSubmit}>Register</Button>
    </Container>
  );
};

export default Register;
