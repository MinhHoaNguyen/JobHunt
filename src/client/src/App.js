import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import JobDetail from "./components/JobDetail";
import MyApplication from "./components/MyApplication";
import './css/style.css';

function App() {
  const isLoggedIn = localStorage.getItem("auth_token");
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/job-detail/:id" element={<JobDetail />}/>
      <Route path="/my-application" element={<MyApplication />} />
      <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
}

export default App;
