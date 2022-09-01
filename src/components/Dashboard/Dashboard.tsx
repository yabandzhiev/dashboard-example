import { useState } from "react";
import { Table, Button } from "@mantine/core";
import { Pagination } from "@mantine/core";

import { UserPostsInterface } from "../../context/UserInterfaces";

import "./Dashboard.scss";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userPosts = JSON.parse(localStorage.getItem("posts") || "{}");
  const [activePage, setPage] = useState<number>(1);

  const postsPerPage = 4;
  const pagesVisited = (activePage - 1) * postsPerPage;

  const pagesNeeded = Math.ceil(userPosts.length / postsPerPage);

  const visiblePosts = userPosts.slice(
    pagesVisited,
    pagesVisited + postsPerPage
  );
  const rows: React.ReactElement[] = visiblePosts.map(
    (post: UserPostsInterface) => (
      <tr key={post.id + post.title}>
        <td>{post.title}</td>
        <td>{post.body}</td>

        <td>
          <Link to={`/post/${post.id}`}>
            <Button>View</Button>
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
