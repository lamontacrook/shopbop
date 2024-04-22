import React from 'react';
import './cards-container.css';

import ImageOne from '../../media/card-image-1.jpg';
import ImageTwo from '../../media/card-image-2.jpg';

const data = [
  {
    'image': ImageTwo,
    'title': 'Keep it cool',
    'description': 'Standout Jackets, relaxed denim: meet R13s latest',
    'link': '#'
  },
  {
    'image': ImageOne,
    'title': 'Outfit completers',
    'description': 'Sleek accents from new-to-Shopbop brand Aureum & more.',
    'link': '#'
  }
];

const CardsContainer = () => {
  return (
    <div className='cards-container'>
      {data.map((item,i ) => (
        <a href={item.link} key={i}>
          <div className='card'>
            <div className='card-img'>
              <img src={item.image} alt={item.title} />
            </div>
            <div className='card-info'>
              <div className='card-title'>{item.title}</div>
              <hr />
              <p>{item.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CardsContainer;