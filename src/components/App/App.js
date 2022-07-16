import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import React from "react";
import {CreateQuiz} from '../CreateQuiz'
import {GiveQuiz} from '../GiveQuiz'
import { Register } from "../Register";
import Welcome from "../Welcome/welcome";
import PrivateRoute from "../PrivateRoute";
import { Dashboard } from "../Dashboard";


const App = () => {

  return (
      <Router>
      <Switch>
      <Route exact path="/">
        <Welcome/>
      </Route>
      <Route exact path="/login">
        <Register/>
      </Route>
      <Route exact path="/give">
        <GiveQuiz/>
      </Route>
      <PrivateRoute exact path="/create">
        <CreateQuiz/>
      </PrivateRoute>
      <PrivateRoute exact path="/panel">
        <Dashboard/>
      </PrivateRoute>
      </Switch>
      </Router>

  );
}

export default App;
