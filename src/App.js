import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navigation from './section/Navigation';
import Home from './page/Home';
import Forsale from './page/Forsale';
import Signup from './page/Signup';
import Signin from './page/Signin';
import Footer from './section/Footer';
import MyAccount from './page/MyAccount';
import {hasToken} from './lib/token';
import Province from './page/property/Province';
import View from './page/property/View';
import Torent from './page/Torent';

function  App() {

  return (
    <Router>
      <Navigation/>

      <Switch>
        {
          hasToken() &&
          ( <Route path='/my-account'>
            <div className='container' style={{padding: "10px"}}>
              <MyAccount/>
            </div>
            </Route>)
        }
         <Route path='/for-sale'>
            <Forsale/>
          </Route>
         <Route path='/to-rent'>
            <Torent/>
          </Route>
        <Route path='/join'>
          <div className='container' style={{padding: "10px"}}>
            <Signup/>
          </div>
        </Route>
        <Route path='/signin'>
          <div className='container' style={{padding: "10px"}}>
            <Signin/>
          </div>
        </Route>
        <Route path='/property/view/:urlkey'>
          <View />
        </Route>
        <Route path='/property/province/:province'>
          <Province />
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>

      <Footer/>
    </Router>
  );
}

export default App;
