import React from "react";
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./auth/protected-route";
import Navbar from "./components/Layout/Navbar";
import ShortenForm from "./components/ShortenForm";
import Footer from "./components/Layout/Footer";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <ShortenForm />
          <Footer />
        </Route>
        <ProtectedRoute path="/profile" component={Profile}></ProtectedRoute>
      </Switch>
    </>
  );
};

export default App;
