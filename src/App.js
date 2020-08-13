import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Navigation from './section/Navigation';
import Home from './page/Home';
import Forsale from './page/Forsale';
import Signup from './page/Signup';
import Signin from './page/Signin';
import Footer from './section/Footer';
import MyAccount from './page/MyAccount';
import {hasToken} from './lib/token';

function  App() {

  return (
    <Router>
      <Navigation/>
      <div className='container' style={{padding: "10px"}}>
      <Switch>
        {
          hasToken() &&
          ( <Route path='/my-account'>
              <MyAccount/>
            </Route>)
        }
         <Route path='/for-sale'>
            <Forsale/>
          </Route>
        <Route path='/join'>
          <Signup/>
        </Route>
        <Route path='/signin'>
          <Signin/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
