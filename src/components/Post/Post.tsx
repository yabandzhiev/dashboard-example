import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Text,
  Button,
  Group,
  Paper,
  TypographyStylesProvider,
  Notification,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";

import { UserContext } from "../../context/UserContext";
import { getPostAndComments } from "../../services/post";
import { EDIT_POST } from "../../common/constants";
import {
  initialPost,
  initialPostInterface,
} from "../../context/UserInitialStatesAndInterfaces";

import "./Post.scss";

const Post = () => {
  const [post, setPost] = useState<initialPostInterface>(initialPost);
  const { id } = useParams() as { id: string };
  const shouldFetch = useRef(true);
  const navigate = useNavigate();
  const { showSuccess, setShowSuccess } = useContext(UserContext);

  useEffect(() => {
    if (shouldFetch.current) {
      fetchPost(id);
      shouldFetch.current = false;
    }
  }, []);

  const fetchPost = async (id: string) => {
    const postResult = await getPostAndComments(id);
    postResult ? setPost(postResult) : navigate("/error");
  };

  const onEditBtnClick = (id: string) => {
    navigate(`/post/${id}/edit`, {
      state: { id, title: post.post.title, body: post.post.body },
    });
  };

  return (
    <>
      {showSuccess && (
        <Notification
          className="success-notification"
          icon={<IconCheck size={18} />}
          color="teal"
          title={showSuccess}
          onClose={() => setShowSuccess("")}
        />
      )}
      <Card shadow="sm" p="lg" radius="md" withBorder className="post-card">
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{post.post.title}</Text>
        </Group>

        <Text size="sm" color="dimmed">
          {post.post.body}
        </Text>

        <Button
          onClick={() => onEditBtnClick(id)}
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
        >
          {EDIT_POST}
        </Button>
      </Card>
      {post.comments.map((comment) => (
        <Paper key={comment.id} withBorder radius="md" className="comment">
          <Group>
            <div>
              <Text size="sm">{comment.name}</Text>
              <Text size="sm">{comment.email}</Text>
            </div>
          </Group>
          <TypographyStylesProvider className="comment-body">
            <div>{comment.body}</div>
          </TypographyStylesProvider>
        </Paper>
      ))}
    </>
  );
};

export default Post;
