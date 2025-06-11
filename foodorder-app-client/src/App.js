import LoginPage from "./Pages/LoginPage";
import HomePage  from "./Pages/HomePage";
import { Container } from "react-bootstrap";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AdminPage from "./Pages/AdminPage";
import UserProfilePage from "./Pages/UserProfilePage";

// console.log ("999 before entering APP");
const myrouter = createBrowserRouter ([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/admin",
        element: <AdminPage />
      },
      {
        path: "/profile",
        element: <UserProfilePage />
      }
    ]
  }
]);

const App = () => {
  // console.log ("999 Entering App");
  // const loggedInUser = JSON.parse (sessionStorage.getItem ("loggedInUser"));
  
  return (
    <>
      <RouterProvider router = {myrouter} />;
    </>
  );
};

export default App;
