import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Hirepage from "./pages/Hirepage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hire" element={<Hirepage />} />
          <Route path="/learn-more" element={<AboutPage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </Routes>
      </SignedOut>
    </>
  );
}
