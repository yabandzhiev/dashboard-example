import { Routes, Route } from "react-router-dom";

import AuthRouteGuard from "./common/AuthRouteGuard/AuthRouteGuard";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import UnknownPage from "./components/UnknownPage/UnknownPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthRouteGuard />}>
          <Route path="/" element={<Header />}>
            <Route index element={<Dashboard />} />
            <Route path="/*" element={<UnknownPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
