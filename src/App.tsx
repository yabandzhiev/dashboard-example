import { Routes, Route } from "react-router-dom";

import AuthRouteGuard from "./common/AuthRouteGuard/AuthRouteGuard";
import UnknownPage from "./components/UnknownPage/UnknownPage";
import Dashboard from "./components/Dashboard/Dashboard";
import EditPost from "./components/EditPost/EditPost";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthRouteGuard />}>
          <Route path="/" element={<Header />}>
            <Route index element={<Dashboard />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
            <Route path="/*" element={<UnknownPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
