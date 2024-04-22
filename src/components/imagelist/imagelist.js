import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import { Link } from 'react-router-dom';
import { AppContext } from '../../utils/context';
import { mapJsonRichText } from '../../utils/renderRichText';
import './imagelist.css';

import CardsContainer from '../cards-container/cards-container';

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

const ImageList = ({ content, editorProps }) => {
  const imageProps = {
    'data-aue-prop': 'images',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset',
    'data-aue-behavior': 'component'
  };

  editorProps['data-aue-behavior'] = 'container';

  const imagelistClass = content.backgroundColor ? `imagelist ${content.backgroundColor}`: 'imagelist';
  
  return (
    <>
      {/*  Remove later */}
      <CardsContainer />
      {/*  Remove later */}

      <div className={imagelistClass}>
        {mapJsonRichText(content?.headline?.json)}
        <span className='list-items' {...editorProps}>
          {content.images && content.images.map((image) => (
            <div key={image._path} className='list-item'>
              <Image imageProps={imageProps} asset={image} title={image.title} alt={image.description} imageSizes={imageSizes} />
            </div>
          ))}
        </span>
      </div>
    </>
  );
};

ImageList.propTypes = {
  content: PropTypes.object,
  editorProps: PropTypes.object
};

export default ImageList;


//https://author-p124331-e1227315.adobeaemcloud.com/content/dam/amazon/assets/products/ullaj2263510687_1709571240895_2-0-_QL90_UX282_.jpg/_jcr_content/renditions/original?ch_ck=1711387638000