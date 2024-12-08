import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth, RequireNotAuth } from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import { Home } from "./pages/Home/index";
import { Error } from "./pages/Error/index";
import { Register } from "./pages/LoginSystem/register";
import { Login } from "./pages/LoginSystem/login";
import TextEditor from "./pages/Editor";
import MyDocs from "./pages/MyDocs";
import MarkdownEditor from "./pages/Editor/markdown";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />

          {/* Routes requiring the user to be logged out */}
          <Route element={<RequireNotAuth />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Routes requiring the user to be logged in */}
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/docs" element={<MyDocs />} />
            <Route path="/docs/:id" element={< MarkdownEditor/>} />
          </Route>

          {/* Routes requiring the user to be an admin */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<h1>Admin page</h1>} />
          </Route>

          <Route path="*" element={<Error code="404" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
