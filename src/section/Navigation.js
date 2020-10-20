import React, {Component} from 'react';
import {hasToken} from '../lib/token';
import {validToken} from '../lib/myaccount/account';

class Navigation extends Component {

  constructor() {
    super();
    this.state = {
      auth: {'result': false, 'message': ''},
      linksNav: [
        {url: '/', name: 'Home'},
        {url: '/for-sale', name: 'For Sale'},
        {url: '/to-rent', name: 'To Rent'},
      ],
      linksAccount: [
        {url: '/join', name: 'Join'},
        {url: '/signin', name: 'Sign In'},
      ],

    };
  }

  async componentDidMount() {
    this.state.auth = await validToken();

    if (hasToken()) {
      if (this.state.auth.result) {
        this.setState({linksAccount : [...this.state.linksAccount, {url: '/my-account', name: 'My Account'}]});
      } else {
        document.cookie = '';
      }
    }
  }

  genLinks(links) {
    return links.map(l => {
      return (
          <li className="nav-item" key={l.url}>
            <a href={l.url} className="nav-link" aria-current='page'>{l.name}</a>
          </li>
      );
    });
  }

  render() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark' style={{backgroundColor: '#054a7f'}}>
          <div className="container-fluid">
            <a href="/" className="navbar-brand">Classify <small>{'{beta}'}</small></a>
            <div className="collapse navbar-collapse " id='navbarNav'>
              <ul className="navbar-nav">
                {this.genLinks(this.state.linksNav)}
              </ul>
              <ul className="navbar-nav ml-auto">
                {this.genLinks(this.state.linksAccount)}
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navigation;
