import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Layouts/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import ContactState from './context/contacts/ContactState';

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
