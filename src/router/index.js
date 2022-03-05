import React, { memo } from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Task from "../pages/Task";

const RouterRender = memo(() => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/task",
      element: <Task />,
    },
  ]);

  return routes;
});

export default RouterRender;
