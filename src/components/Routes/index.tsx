import { createBrowserRouter } from "react-router-dom";
import SignIn from "../../pages/SignIn";
import Layout from "../Layout";
import Home from "../../pages/Home";
import Records from "../../pages/Records";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/records",
        element: <Records />,
      },
    ],
  },

  {
    path: "/signin",
    element: <SignIn />,
  },

  { element: <div>Not found :(</div>, path: "*" },
]);

export default router;
