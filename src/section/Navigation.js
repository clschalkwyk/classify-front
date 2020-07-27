import React, {Component} from 'react';

class Navigation extends Component {

  genLinks(links){
    return links.map( l => {
      return (
          <li className="nav-item" key={l.url}>
            <a href={l.url}  className="nav-link" aria-current='page'>{l.name}</a>
          </li>
      );
    });
  }

  render() {
    const linksNav = [
                  {url: '/', name: 'Home' },
                  {url: '/jobs', name: 'Jobs' },
                  {url: '/for-sale', name: 'For Sale' },
                  {url: '/to-rent', name: 'To Rent' },
                  ];
    const linksAccount = [
                  {url: '/my-account', name: 'My Account' },
                  {url: '/join', name: 'Join' },
                  {url: '/signin', name: 'Sign In' },
                  ];
    return (
      <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor: '#feffff'}}>
        <div className="container-fluid">
          <a href="/" className="navbar-brand">Classify <small>{"{beta}"}</small></a>
          <div className="collapse navbar-collapse " id='navbarNav'>
            <ul className="navbar-nav">
              {this.genLinks(linksNav)}
            </ul>
            <ul className="navbar-nav ml-auto">
              {this.genLinks(linksAccount)}
            </ul>
          </div>
        </div>
      </nav>
      );
  }
}

export default Navigation;