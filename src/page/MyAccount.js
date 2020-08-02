import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AboutMe from './myaccount/AboutMe';
import MyAds from './myaccount/MyAds';

function MyAccount(){


  return (
      <section>
      <h2>My Account</h2>
        <div className='row'>
          <div className='col-md-2'>
            <nav className="nav flex-column">
              <a className="nav-link" href="/my-account/about-me">About Me</a>
              <a className="nav-link" href="/my-account/my-ads">My Ads</a>
            </nav>
          </div>
          <div className='col-md-10'>
            <Router>
              <Switch>
                <Route path='/my-account/about-me'>
                  <AboutMe/>
                </Route>
                <Route path='/my-account/my-ads'>
                  <MyAds/>
                </Route>
                <Route path='/my-account/'>
                  <AboutMe/>
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </section>

  );
}

export default MyAccount;