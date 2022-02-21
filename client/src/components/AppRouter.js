import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRouts, publicRouts } from "../routs";
import { ERROR_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      { user.isAuth && privateRouts.map(({ path, component }) =>
        <Route path={ path } element={ component } exact key={ path }/>
      ) }
      { publicRouts.map(({ path, component }) =>
        <Route path={ path } element={ component } exact key={ path }/>
      ) }
      <Route path="*" element={ <Navigate to={ ERROR_ROUTE }/> }/>
      {/*<Route path="*" element={ <Navigate to="/" /> } />*/ }
    </Routes>
  );
});

export default AppRouter;
