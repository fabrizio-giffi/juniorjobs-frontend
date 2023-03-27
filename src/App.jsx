import { Route, Routes } from "react-router-dom";
import "./App.css";
import CompanyProfilePublic from "./components/companies/CompanyProfilePublic";
import IsCompany from "./components/middlewares/IsCompany";
import IsLoading from "./components/middlewares/IsLoading";
import IsLoggedIn from "./components/middlewares/IsLoggedIn";
import IsLoggedOut from "./components/middlewares/IsLoggedOut";
import NavBar from "./components/NavBar";
import CreateJobPost from "./pages/CreateJobPost";
import JobPostDetails from "./pages/JobPostDetails";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import JobList from "./components/jobs/JobList";
import JuniorList from "./components/juniors/JuniorList";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import JuniorDetails from "./pages/JuniorDetails";
import Pay from "./pages/Pay";

function App() {
  return (
    <div style={{ height: "100vhs" }}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/jobs"
            element={
              <IsLoading>
                  <JobList />
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
          <Route path="/forgot-password/:role" element={<ForgotPassword />} />
          <Route path="/reset/:user/:token" element={<ResetPassword />} />
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
          <Route path="/junior" element={<JuniorList />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/junior/:id" element={<JuniorDetails />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
