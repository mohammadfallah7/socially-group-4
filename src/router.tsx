import { createBrowserRouter } from "react-router";
import App from "./App";
import RootLayout from "./components/layout/RootLayout";
import Notifications from "./pages/NotificationPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: App },
      { path: "notifications", Component: Notifications },
      { path: "profile/:username", Component: ProfilePage },
    ],
  },
  {
    path: "/sign-in",
    Component: SignInPage,
  },
  {
    path: "/sign-up",
    Component: SignUpPage,
  },
]);

export default router;
