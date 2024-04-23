import React, { useContext } from 'react';
import ModelManager from '../../utils/modelmanager';
import { useGraphQL } from '../../utils/useGraphQL';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../loading';
import { AppContext } from '../../utils/context';
import './preview.css';

const Preview = () => {
  const context = useContext(AppContext);

  const props = useParams();

  const persistentQuery = 'teaser';

  const { data, errorMessage } = useGraphQL(persistentQuery, { path: '/content/dam/amazon/site/en/teaser-1' });
  console.log(data);

  const { item } = data.component;

  if (errorMessage) return;

  if (!data) return <Loading />;

  let i = 0;

  return (
    <div key={item.path} className='main-body'
      data-aue-type='container'
      data-aue-behavior='component'
      data-aue-filter='screen'
      data-aue-label={item._model.title}
      data-aue-model={item._model._path}
      data-aue-prop='block'
      data-aue-resource={`urn:aemconnection:${item._path}/jcr:content/data/${item._variation}`}>

      <div className='block'>
        <ModelManager content={item} dataProp='block' dataBehavior='component'></ModelManager>
      </div>
    </div>
  );
};

Preview.propTypes = {
  pos1: PropTypes.string,
  pos2: PropTypes.string,
  pos3: PropTypes.string,
  location: PropTypes.object,
  context: PropTypes.object
};

export default Preview;
