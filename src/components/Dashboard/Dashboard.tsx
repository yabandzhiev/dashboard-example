import { useState } from "react";
import { Table, Button } from "@mantine/core";
import { Pagination } from "@mantine/core";
import { Link } from "react-router-dom";

import { UserPostsInterface } from "../../context/UserInitialStatesAndInterfaces";
import { POSTS_PER_PAGE, VIEW } from "../../common/constants";

import "./Dashboard.scss";

const Dashboard = () => {
  const userPosts = JSON.parse(localStorage.getItem("posts") || "{}");
  const [activePage, setPage] = useState<number>(1);

  const pagesVisited = (activePage - 1) * POSTS_PER_PAGE;

  const pagesNeeded = Math.ceil(userPosts.length / POSTS_PER_PAGE);

  const visiblePosts = userPosts.slice(
    pagesVisited,
    pagesVisited + POSTS_PER_PAGE
  );
  const rows: React.ReactElement[] = visiblePosts.map(
    (post: UserPostsInterface) => (
      <tr key={post.id + post.title}>
        <td>{post.title}</td>
        <td>{post.body}</td>

        <td>
          <Link to={`/post/${post.id}`}>
            <Button>{VIEW}</Button>
          </Link>
        </td>
      </tr>
    )
  );

  return (
    <>
      <Table striped className="dashboard-table">
        <thead className="dashboard-thead">
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        className="dashboard-pagination"
        page={activePage}
        onChange={setPage}
        total={pagesNeeded}
      />
    </>
  );
};

export default Dashboard;
