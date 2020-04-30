import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const Register = (props) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
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

    const { ok, errors } = response.data.register;
    if (ok) {
      props.history.push("/");
    } else {
      const responseErrors = {};
      errors.map(({ path, message }) => {
        responseErrors[path] = message;
      });
      setFormErrors(responseErrors);
    }
  };

  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Input
        error={!!formErrors.username}
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={updateField}
        fluid
      />
      <Input
        error={!!formErrors.email}
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={updateField}
        fluid
      />
      <Input
        error={!!formErrors.password}
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={updateField}
        fluid
      />
      <Button onClick={onSubmit}>Register</Button>
      {formErrors.username || formErrors.email || formErrors.password ? (
        <Message
          error
          header="There was some errors with your submission"
          list={Object.keys(formErrors).map((key) => formErrors[key])}
        />
      ) : null}
    </Container>
  );
};

export default Register;
