import { Route, Routes } from "react-router-dom";
import "./App.css";
import CompanyProfilePublic from "./components/CompanyProfilePublic";
import IsCompany from "./components/IsCompany";
import IsLoggedIn from "./components/IsLoggedIn";
import IsLoggedOut from "./components/IsLoggedOut";
import JobPostForm from "./components/JobPostForm";
import JuniorProfile from "./components/JuniorProfile";
import JuniorProfilePublic from "./components/JuniorProfilePublic";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import JobList from "./pages/JobList";
import JobPostDetails from "./pages/JobPostDetails";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <IsLoggedOut>
              <LoginPage />
            </IsLoggedOut>
          }
        />
        <Route
          path="/signup"
          element={
            <IsLoggedOut>
              <SignupPage />
            </IsLoggedOut>
          }
        />
        <Route
          path="/profile"
          element={
            <IsLoggedIn>
              <ProfilePage />
            </IsLoggedIn>
          }
        />
        <Route
          path="/create-post"
          element={
            <IsCompany>
              <JobPostForm />
            </IsCompany>
          }
        />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobPostDetails />} />
        <Route path="/company/:id" element={<CompanyProfilePublic/>} />
        <Route path="/junior/:id" element={<JuniorProfilePublic/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
