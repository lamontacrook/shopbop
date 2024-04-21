import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../components/banner/';
import ImageList from '../components/imagelist';
import ProductList from '../components/productlist';
import CollectionsCarousel from '../components/collections-carousel';

export const componentMapping = {
  Banner,
  ImageList,
  ProductList,
  CollectionsCarousel
};


const editorProps = ( content, title, dataProp, dataBehavior ) => {
  return {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': title,
    'data-aue-model': content?._model?._path,
    'data-aue-behavior': dataBehavior || 'component',
    'data-aue-prop': dataProp,
    'data-aue-filter': 'cf'
  };
};

const ModelManager = ({ content, dataProp, dataBehavior }) => {
  if (content && content._model) {
    const { title } = content._model;
    const Component = componentMapping[title.replace(' ', '')];

    if (typeof Component !== 'undefined')
      return <Component editorProps={editorProps(content, title, dataProp, dataBehavior)} content={content} />;
    else return <p>Neet to add {title} to ModelManager.</p>;
  } else {
    console.log(content);
    return <p>content does not contain <pre>_model</pre>{content.__typename}</p>;
  }
};

ModelManager.propTypes = {
  content: PropTypes.object,
  dataProp: PropTypes.string,
  dataBehavior: PropTypes.string
};

export default ModelManager;
