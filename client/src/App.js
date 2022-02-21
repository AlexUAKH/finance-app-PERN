import React, { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./components/AppRouter";
import AppNavBar from "./components/AppNavBar";
import ScrollToTop from "./components/ScrollToTop";

import "./App.scss";
import AppFooter from "./components/AppFooter";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import LoaderOverley from "./components/LoaderOverley";
import AppToast from "./components/AppToast";

function App() {
  const { user, toast } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token"))  {
      user.checkAuth();
    }
  }, []);

  // if (user.isLoading) return (<LoaderOverley/>);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        { user.isLoading && <LoaderOverley /> }
        { toast.isShow && <AppToast /> }
        <div className="d-flex flex-column h-100">
          <AppNavBar />
          <main className="align-self-stretch" style={{ flex: "1 0 auto" }}>
            <AppRouter />
          </main>
          <AppFooter />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default observer(App);
