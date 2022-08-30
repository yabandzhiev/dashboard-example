import { Container, Title, Text, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Illustration } from "./Illustration";

import "./UnknownPage.scss";

const UnknownPage = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/");
  };

  return (
    <Container className="container">
      <div className="container-inner ">
        <Illustration className="container-image" />
        <div className="container-content">
          <Title className="container-title">Nothing to see here</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className="container-description"
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position="center">
            <Button onClick={redirectToDashboard} size="md">
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default UnknownPage;
