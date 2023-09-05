import { lazy } from "react";

const Home = lazy(() => import("../Pages/Home"));
const Contact = lazy(() => import("../Pages/Contact"));
const Product = lazy(() => import("../Pages/Product"));
const Signup = lazy(() => import("../Component/User/Signup"));
const Login = lazy(() => import("../Component/User/Login"));
const QueryEmail = lazy(() => import("../Component/User/QueryEmail"));
const Otp = lazy(() => import("../Component/User/Otp"));
const Reset = lazy(() => import("../Component/User/Reset"));
const Translator = lazy(() => import("../Pages/Translator"));
const Invalid = lazy(() => import("../commons/InvalidPage"));

export const routes = {
  home: {
    path: "/",
    element: Home,
  },
  signup: {
    path: "/signup",
    element: Signup,
  },
  login: {
    path: "/login",
    element: Login,
  },
  queryEmail: {
    path: "/queryEmail",
    element: QueryEmail,
  },
  otp: {
    path: "/otp",
    element: Otp,
  },
  reset: {
    path: "/reset",
    element: Reset,
  },
  product: {
    path: "/product",
    element: Product,
  },
  contact: {
    path: "/contact",
    element: Contact,
  },
  translator: {
    path: "/translator",
    element: Translator,
  },
  invalid: {
    path: "/*",
    element: Invalid,
  },
};
