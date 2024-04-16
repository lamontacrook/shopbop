import React from 'react';
import logoPath from '../../media/shopbop-logo.png';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div>

      </div>
      <div>
        <a href="">
          <img src={logoPath} />
        </a>
      </div>
    </div>
  );
};

export default Header;