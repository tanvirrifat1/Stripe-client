import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import Main from "../Main/Main";
import PaymentHistory from "../PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "history",
        element: <PaymentHistory />,
      },
    ],
  },
]);
