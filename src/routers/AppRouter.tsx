import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import routes from "./routes";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const route = routes.find((r) => r.path === location.pathname);
    console.info(location.pathname);
    if (route) {
      document.title = `${route.name}`;
    }
  }, [location.pathname]);

  return (
    <div>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </div>
  )
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default AppRouter;
