/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../utils/context';

import './image.css';
import { srcSet, sizes } from '../../utils/responsive-image';

const Image = ({ asset, alt = 'WKND image', imageProps='', width, height, imageSizes }) => {
  const context = useContext(AppContext);
  const { serviceURL } = context;
  const imageUrl = () => {
    if(Object.keys(asset).includes('_dynamicUrl')) {  
      return serviceURL.replace(/\/$/, '') + asset._dynamicUrl;
    } else {  
      return serviceURL.replace(/\/$/, '') + asset._path;
    }
  };

  if(!asset) return (
    <picture>
      <img src={context.brokenImage} alt='broken image' />
    </picture>
  );

  
  width = width || asset?.width || '';
  height = height || asset?.height || '';

  
  return (
    <picture>
      <img loading='lazy' alt={alt} src={serviceURL.replace(/\/$/, '') + asset._path} width={width} height={height} srcSet={srcSet(imageUrl(), imageSizes)} sizes={sizes(imageSizes)} {...imageProps}/>
    </picture>
  );
};

Image.propTypes = {
  asset: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
  imageProps: PropTypes.object,
  imageSizes: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
};

export default Image;