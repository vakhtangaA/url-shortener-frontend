import React from "react";
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./auth/protected-route";
import Navbar from "./components/Layout/Navbar";
import ShortenForm from "./components/ShortenForm";
import Footer from "./components/Layout/Footer";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <>
      <div className="exceptFooter">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <ShortenForm />
          </Route>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
