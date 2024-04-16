import React from 'react';
import OptOutIcon from '../../media/opt-out-icon.png';

import './footer.css';
const footerContent = [
  {
    title: 'ShopBop',
    links: [
      {
        title: 'About Us',
        _url: ''
      },
      {
        title: 'Careers',
        _url: ''
      },
      {
        title: 'Affiliates',
        _url: ''
      },
      {
        title: 'Gift Cards',
        _url: ''
      },
      {
        title: 'Get Amazon Prime Benefits',
        _url: ''
      }
    ]
  },
  {
    title: 'Help',
    links: [
      {
        title: 'Return Policy',
        _url: ''
      },
      {
        title: 'Shipping Options',
        _url: ''
      },
      {
        title: 'Contact Us',
        _url: ''
      },
    ]
  },
  {
    title: 'Personalize',
    links: [
      {
        title: 'My Account',
        _url: ''
      },
      {
        title: 'My Loyalty',
        _url: ''
      },
      {
        title: 'My Hearts',
        _url: ''
      },
      {
        title: 'My Wish List',
        _url: ''
      },
      {
        title: 'My Designers',
        _url: ''
      },
      {
        title: 'Shopping Preferences',
        _url: ''

      }
    ]
  },
  {
    title: 'Connect',
    links: [
      {
        title: 'Get the App',
        icon: '',
        _url: ''
      },
      {
        title: 'TikTok',
        icon: '',
        _url: ''
      },
      {
        title: 'Instagram',
        icon: '',
        _url: ''},
      {
        title: 'Facebook',
        icon: '',
        _url: ''},
      {
        title: 'Pinterest',
        icon: '',
        _url: ''},
      {
        title: 'Sign up for Shopbop emails',
        icon: '',
        _url: ''
      }
    ]
  }
];

const Footer = () => {

  return (
    <div className='footer-content-wrapper'>
      <div className='footer-navigation'>
        {footerContent && footerContent.map((content, index) => (
          <nav key={index}>
            <h3>{content.title}</h3>
            <ul className='footer-menu'>
              {content.links && content.links.map((link, index) => {
                return(
                  <li key={index}>
                    <a href={link._url}>{link.title}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )
        )}
      </div>
      <div className='footer-copyright'>
        <span>
          © 1999-2024 BOP LLC. All Rights Reserved.
        </span>
        <div className='copyright-links'>
          <a>Privacy Notice</a>
          <a>Conditions of Use</a>
          <span className='link-icon'><img src={OptOutIcon} /><a>Your Ads Privacy Choices</a></span>
        </div>
      </div>

    </div>
  );
};

export default Footer;