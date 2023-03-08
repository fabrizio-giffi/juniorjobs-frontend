import { Route, Routes } from "react-router-dom";
import "./App.css";
import CompanyProfilePublic from "./components/CompanyProfilePublic";
import IsCompany from "./components/middlewares/IsCompany";
import IsLoading from "./components/middlewares/IsLoading";
import IsLoggedIn from "./components/middlewares/IsLoggedIn";
import IsLoggedOut from "./components/middlewares/IsLoggedOut";
import JuniorProfilePublic from "./pages/JuniorProfilePublic";
import NavBar from "./components/NavBar";
import CreateJobPost from "./pages/CreateJobPost";
import HomePage from "./pages/HomePage";
import JobPostDetails from "./pages/JobPostDetails";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import { height } from "@mui/system";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <IsLoading>
                <HomePage />
              </IsLoading>
            }
          />
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
                <CreateJobPost />
              </IsCompany>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <IsLoading>
                <JobPostDetails />
              </IsLoading>
            }
          />
          <Route
            path="/company/:id"
            element={
              <IsLoading>
                <CompanyProfilePublic />
              </IsLoading>
            }
          />
          <Route path="/junior/:id" element={<JuniorProfilePublic />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
