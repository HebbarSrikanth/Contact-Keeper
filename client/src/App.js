import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Layouts/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './Layouts/Alerts';
import setAuthtoken from './utils/setAuthtoken';
import PrivateRoute from './router/PrivateRoute';

if (localStorage.token)
  setAuthtoken(localStorage.token)

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route path='/register' component={Register} />
                  <Route path='/about' component={About} />
                  <Route path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>

  );
}

export default App;
