import React, { memo } from "react";

import RouterRender from "./router";
import { BrowserRouter } from "react-router-dom";

const App = memo(() => {
  return (
    <BrowserRouter>
      <RouterRender />
    </BrowserRouter>
  );
});

export default App;
