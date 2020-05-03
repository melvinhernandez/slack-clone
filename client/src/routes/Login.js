import React, { useState } from "react";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";

const Login = () => {
  extendObservable(this, {
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = this;

  const onSubmit = (e) => {
    const { email, password } = this;
    console.log("email, password", email, password);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
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
      {/* {formErrors.username || formErrors.email || formErrors.password ? (
        <Message
          error
          header="There was some errors with your submission"
          list={Object.keys(formErrors).map((key) => formErrors[key])}
        />
      ) : null} */}
    </Container>
  );
};

export default Login;
