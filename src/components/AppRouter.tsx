import { Navigate, Route, Routes } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { privateRoutes, publicRoutes, RouteNames } from "../router";

const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.component />}
          key={route.path}
        />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.EVENT} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.component />}
          key={route.path}
        />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRouter;
