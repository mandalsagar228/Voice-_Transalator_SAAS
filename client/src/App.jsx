import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./context/AuthProvider";
import { lazy, Suspense } from "react";
import { routes } from "./Routes/Route";
import SuspenseLoader from "./commons/SuspenseLoader";
const ErrorComponent = lazy(() => import("./commons/ErrorComponent"));

import Root from "./Pages/Root";
import PrivateRoutes from "./Component/PrivateRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />}>
        <Route
          path={routes.home.path}
          element={<routes.home.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.login.path}
          element={<routes.login.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.signup.path}
          element={<routes.signup.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.queryEmail.path}
          element={<routes.queryEmail.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.otp.path}
          element={<routes.otp.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.reset.path}
          element={<routes.reset.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.contact.path}
          element={<routes.contact.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.Googlelogin.path}
          element={<routes.Googlelogin.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.product.path}
          element={
            <PrivateRoutes>
              <routes.product.element />
            </PrivateRoutes>
          }
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.translator.path}
          element={
            <PrivateRoutes>
              <routes.translator.element />
            </PrivateRoutes>
          }
          errorElement={<ErrorComponent />}
        />

        <Route
          path={routes.invalid.path}
          element={<routes.invalid.element />}
          errorElement={<ErrorComponent />}
        />
      </Route>
    </>
  )
);

function App() {
  const clientId =
    "2061723710-8db33a9phb16nc221avmteuiud7qtg6k.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <Suspense fallback={<SuspenseLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
