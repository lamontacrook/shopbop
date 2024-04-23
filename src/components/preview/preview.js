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
  const param = props['*'];
  
  const slash = param.indexOf('/');
  const persistentQuery = param.slice(0, slash);
  const pth = param.slice(slash);

  const { data, errorMessage } = useGraphQL(persistentQuery, { path: pth });
  //https://experience.adobe.com/#/@aemxscsandbox1/aem/editor/canvas/localhost:3000/preview/teaser/content/dam/amazon/site/en/teaser-1

  if (errorMessage) return;

  let item = '';
  if (!data) return <Loading />;
  else item = data.component.item;

  let i = 0;

  return (
    <div key={item.path} className='main-body'>
      <div className='block'>
        <ModelManager content={item} dataProp='block' dataBehavior='component'></ModelManager>
      </div>
    </div>
  );
};

Preview.propTypes = {
  '*': PropTypes.object
};

export default Preview;
