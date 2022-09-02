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
import { locationInterface } from "../../context/UserInitialStatesAndInterfaces";
import {
  BAD_REQUEST,
  INPUT_LENGTH_TOO_SHORT,
  SUCCESSFULLY_EDITED,
  TITLE_MUST_BE_MORE_THAN,
  BODY_MUST_BE_MORE_THAN,
  EDIT_POST,
  EDIT,
} from "../../common/constants";

import "./EditPost.scss";

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
        setShowSuccess(SUCCESSFULLY_EDITED);
        navigate(`/post/${state.id}`);
      } else {
        setError(BAD_REQUEST);
      }
    } else {
      setError(INPUT_LENGTH_TOO_SHORT);
    }
  };
  return (
    <div className="edit-form-wrapper">
      <Title className="title" order={2}>
        {EDIT_POST}
      </Title>
      <form className="edit-form" onSubmit={(e) => onFormSubmit(e)}>
        <TextInput
          withAsterisk
          label="Title"
          value={title}
          error={title.length < 5 ? TITLE_MUST_BE_MORE_THAN : ""}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />

        <Textarea
          withAsterisk
          label="Body"
          value={body}
          error={body.length < 20 ? BODY_MUST_BE_MORE_THAN : ""}
          onChange={(event) => setBody(event.currentTarget.value)}
        />
        <Button type="submit">{EDIT}</Button>
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
