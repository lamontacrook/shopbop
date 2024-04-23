import React, { useContext } from 'react';
import logoPath from '../../media/shopbop-logo.png';
import amazonPrime from '../../media/amazon-prime.svg';
import { AppContext } from '../../utils/context';
import './header.css';

const Header = () => {
  const updateLang = (ev) => {
    console.log(ev.target.textContent.toLowerCase());
    if (ev.target.textContent.toLowerCase() === 'en')
      window.location = '/es/';
    else
      window.location = '/en/';
  };

  const context = useContext(AppContext);
  return (
    <div className='header-wrapper'>
      <div className='info-bar-wrapper'>
        <div className='info-bar'>
          <div className='metadata'>
            <button className='location'>US</button>
            <button className='language' aria-expanded='false' onClick={(e) => updateLang(e)}>{context.lang.toUpperCase()}</button>
            <button className='currency'>$USD</button>

          </div>
          <div className='prime-banner'>
            <span>FREE shipping and FREE returns |</span>
            <img src={amazonPrime} />
          </div>

          <div className='account'>
            <a className='login'>Sign In / Register</a>
            <button className='favorites'></button>
            <button className='bag'>0</button>
          </div>
        </div>
      </div>
      <div className='logo-wrapper'>
        <a href="https://www.shopbop.com/">
          <img src={logoPath} />
        </a>
      </div>
    </div>
  );
};

export default Header;