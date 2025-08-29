import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import * as Sentry from "@sentry/react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Hirepage from "./pages/Hirepage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;

  return (
    <SentryRoutes>
      <Route
        path="/"
        element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />}
      />
      <Route
        path="/auth"
        element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
      />

      <Route
        path="/hire"
        element={isSignedIn ? <Hirepage /> : <Navigate to={"/auth"} replace />}
      />
      <Route path="/learn-more" element={<AboutPage />} />

      <Route
        path="*"
        element={
          isSignedIn ? (
            <Navigate to={"/"} replace />
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
    </SentryRoutes>
  );
}
