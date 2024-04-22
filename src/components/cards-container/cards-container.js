import React from 'react';
import PropTypes from 'prop-types';
import { mapJsonRichText } from '../../utils/renderRichText';
import Image from '../image';
import './cards-container.css';

const imageSizes = [
  {
    imageWidth: '1600px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1200px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1000px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '800px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '600px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-small.webp',
  },
  {
    size: '100vw',
  }
];

const CardsContainer = ({ content }) => {
  const editorProps = (content, title, dataProp, dataBehavior, dataFilter = 'cf') => {
    return {
      'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
      'data-aue-type': 'container',
      'data-aue-label': title,
      'data-aue-model': content?._model?._path,
      'data-aue-behavior': dataBehavior || 'component',
      'data-aue-prop': dataProp,
      'data-aue-filter': dataFilter
    };
  };

  const imageProps = {
    'data-aue-prop': 'images',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset',
    'data-aue-behavior': 'component'
  };

  return (
    <div className='cards-container' {...editorProps(content, 'Cards Collection', 'cards', 'component', 'cards-collection')}>
      {content.cards.map((card, i) => (
        <span key={i} {...editorProps(card, card.title, 'cards', 'component')}>
          <a href='#'>
            <div className='card'>
              <div className='card-img'>
                <Image imageProps={imageProps} asset={card.asset} title={card.asset?.title} alt={card.asset?.description} imageSizes={imageSizes} />
              </div>
              <div className='card-info'>
                <div className='card-title'>{card.title}</div>
                <hr />
                <p>{mapJsonRichText(card.description.json)}</p>
              </div>
            </div>
          </a>
        </span>
      ))}
    </div>
  );
};

CardsContainer.propTypes = {
  content: PropTypes.object,
};

export default CardsContainer;