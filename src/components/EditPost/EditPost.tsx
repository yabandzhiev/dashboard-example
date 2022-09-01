import {
  Button,
  TextInput,
  Textarea,
  Title,
  Notification,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { UserContext } from "../../context/UserContext";
import { editPost } from "../../services/post";

import "./EditPost.scss";

interface locationInterface {
  state: {
    id: string;
    title: string;
    body: string;
  };
}

const titleSchema = yup.string().required().min(5);
const bodySchema = yup.string().required().min(20);

const EditPost = () => {
  const { state } = useLocation() as locationInterface;
  const { error, setError, setShowSuccess } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleValidation = await titleSchema.isValid(title);
    const bodyValidation = await bodySchema.isValid(body);
    if (titleValidation && bodyValidation) {
      const editRequestStatus = await editPost(state.id, title, body);

      if (editRequestStatus.status === 200) {
        setError("");
        setShowSuccess("Successfully edited");
        navigate(`/post/${state.id}`);
      } else {
        setError("Bad Request");
      }
    } else {
      setError("Input length too short!");
    }
  };
  return (
    <div className="edit-form-wrapper">
      <Title className="title" order={2}>
        Edit Post
      </Title>
      <form className="edit-form" onSubmit={(e) => onFormSubmit(e)}>
        <TextInput
          withAsterisk
          label="Title"
          value={title}
          error={
            title.length < 5 ? "Title must be more than 5 characters!" : ""
          }
          onChange={(event) => setTitle(event.currentTarget.value)}
        />

        <Textarea
          withAsterisk
          label="Body"
          value={body}
          error={
            body.length < 20 ? "Body must be more than 20 characters!" : ""
          }
          onChange={(event) => setBody(event.currentTarget.value)}
        />
        <Button type="submit">Edit</Button>
      </form>
      {error && (
        <Notification
          className="error-notification"
          icon={<IconX size={18} />}
          color="red"
          title={error}
          onClose={() => setError("")}
        />
      )}
    </div>
  );
};

export default EditPost;
