import { Route, Routes } from "react-router-dom";
import "./App.css";
import IsLoggedIn from "./components/IsLoggedIn";
import IsLoggedOut from "./components/IsLoggedOut";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
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
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
