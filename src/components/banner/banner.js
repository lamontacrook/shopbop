import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import Video from '../video/video';
import { Link } from 'react-router-dom';
import { AppContext } from '../../utils/context';
import './banner.css';

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

const Banner = ({ content, editorProps }) => {
  const renderAsset = ({ asset }) => {
    const imageProps = {
      'data-aue-prop': 'asset',
      'data-aue-type': 'media',
      'data-aue-label': 'Asset'
    };
    if (asset && Object.prototype.hasOwnProperty.call(content.asset, 'format'))
      return (<Video content={content.asset} imageProps={imageProps} test='test'/>);
    else
      return (<Image imageProps={imageProps} asset={content.asset} alt={content.title} imageSizes={imageSizes} />);
  };

  const bannerClass = content.backgroundColor ? `banner ${content.backgroundColor}`: 'banner';

  return (
    <div className={bannerClass} {...editorProps}>
      {renderAsset(content)}
    </div>
  );
};

Banner.propTypes = {
  content: PropTypes.object,
  editorProps: PropTypes.object
};

export default Banner;


//https://author-p124331-e1227315.adobeaemcloud.com/content/dam/amazon/assets/products/ullaj2263510687_1709571240895_2-0-_QL90_UX282_.jpg/_jcr_content/renditions/original?ch_ck=1711387638000