
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Video from '../video';
import Image from '../image';
import { AppContext } from '../../utils/context';
import './teaser.css';

const imageSizes = [
  {
    imageWidth: '660px',
    renditionName: 'web-optimized-large.webp',
    size: '(min-width: 1000px) 660px'
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
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    size: '100vw',
  }
];


const imageSizesHero = [
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

const Teaser = ({ content, component = true }) => {

  const renderAsset = ({ asset }) => {
    const imageProps = {
      'data-aue-prop': 'asset',
      'data-aue-type': 'media',
      'data-aue-label': 'Asset'
    };
    if (asset && Object.prototype.hasOwnProperty.call(content.asset, 'format'))
      return (<Video content={content.asset} />);
    else if (asset && Object.prototype.hasOwnProperty.call(content.asset, 'mimeType'))
      return (<Image imageProps={imageProps} asset={content.asset} alt={content.title} imageSizes={content.style === 'hero' ? imageSizesHero : imageSizes} />);
    else
      return (<Image imageProps={imageProps} asset={content.asset} alt={content.title} imageSizes={content.style === 'hero' ? imageSizesHero : imageSizes} />);
  };

  const hero = () => {
    return (
      <div className='wrapper'>
        {renderAsset(content)}
        <div className='content-container'>
          <div className='content-column'>
            <div className='main-content'>
              {content.title && content.style === 'hero' && (
                <h1 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h1>
              )}
              {content.preTitle && content.style === 'featured' && (
                <h5 data-aue-prop='preTitle' data-aue-type='text' data-aue-label='Pre-Title'>{content.preTitle}</h5>
              )}
              {content.description && (
                <p data-aue-prop='description' data-aue-type='text' data-aue-label='Description'>{content.description.plaintext}</p>
              )}
              {content.callToAction && content.link && (
                <a href='#'>{content.callToAction}</a>
              )} </div>
          </div>
        </div>
      </div>
    );
  };


  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/master`,
    'data-aue-type': 'reference',
    'data-aue-label': `Teaser(${content.style})`,
    'data-aue-model': content?._model?._path
  };

  if (component) editorProps['data-aue-behavior'] = 'component';

  return <div className={`teaser ${content.style}`} {...editorProps}>{hero()}</div>;

};

Teaser.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
  component: PropTypes.bool
};

export default Teaser;
