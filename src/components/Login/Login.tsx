import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { PasswordInput, TextInput, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, error, setError } = useContext(UserContext);
  const navigate = useNavigate();
  const shouldFetch = useRef(false);

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      login(email, password);
    }
  }, []);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    shouldFetch.current = true;
    const isUserLoggedIn = await login(email, password);
    isUserLoggedIn
      ? (setError(""), navigate("/"))
      : setError("Invalid Credentials!");
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={(e) => onFormSubmit(e)}>
        <TextInput
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button type="submit">Login</Button>
      </form>
      {error && (
        <Notification
          className="error-notification"
          icon={<IconX size={18} />}
          color="red"
          title={error}
          onClose={() => setError("")}
        >
          Email or Password are incorrect, please try again!
        </Notification>
      )}
    </div>
  );
};

export default Login;
