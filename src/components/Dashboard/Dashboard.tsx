import { useState } from "react";
import { Table, Button } from "@mantine/core";
import { Pagination } from "@mantine/core";

import { UserPostsInterface } from "../../context/UserInterfaces";

import "./Dashboard.scss";

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
    (row: UserPostsInterface) => (
      <tr key={row.id + row.title}>
        <td>{row.title}</td>
        <td>{row.body}</td>

        <td>
          <Button>View</Button>
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
