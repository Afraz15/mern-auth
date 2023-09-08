import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Move useNavigate here

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const sendHandler = async () => {
    let res;
    try {
      res = await axios.post("http://localhost:5000/api/log-in", {
        email: inputs.email,
        password: inputs.password,
      });
      // Handle the response data here if needed
      console.log(res.data);
      debugger;
    } catch (err) {
      console.log(err);
      // Handle the error here
    }
  };

  const handleClick = () => setShow(!show);

  const submitHandler = async (e) => {
    e.preventDefault();
    await sendHandler();
    navigate("/login"); // Use navigate from here
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ width: "30%" }} onSubmit={submitHandler}>
        <FormControl mb={"4"}>
          <FormLabel>Email</FormLabel>
          <Input
            onChange={onChangeHandler}
            name="email"
            type="email"
            placeholder="Your Email"
          />
        </FormControl>
        <FormControl mb={"4"}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              onChange={onChangeHandler}
              name="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <But  n h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </But>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUp;
