import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../components/banner/';
import ImageList from '../components/imagelist';
import ProductList from '../components/productlist';

export const componentMapping = {
  Banner,
  ImageList,
  ProductList
};

const ModelManager = ({ content, dataAueProp, dataAueBehavior }) => {
  const { title } = content._model;
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': title,
    'data-aue-model': content?._model?._path,
    'data-aue-behavior': dataAueBehavior,
    'data-aue-prop': dataAueProp,
    'data-aue-filter': 'cf'
  };
  const Component = componentMapping[title.replace(' ', '')];
 
  if (typeof Component !== 'undefined')
    return <Component editorProps={editorProps} content={content}/>;
  else return <p>Neet to add {title} to ModelManager.</p>;
};

ModelManager.propTypes = {
  content: PropTypes.object,
  dataAueProp: PropTypes.string,
  dataAueBehavior: PropTypes.string
};

export default ModelManager;
