import React, { memo } from "react";
import { LoginWrapper } from "./style";

import { useNavigate } from "react-router-dom";

const Login = memo(() => {
  const navigate = useNavigate();

  const loginIn = () => {
    navigate("/task");
  };

  return <LoginWrapper onClick={loginIn}>Start App</LoginWrapper>;
});

export default Login;
