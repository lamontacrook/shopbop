import React, { useState, useContext } from 'react';
import ModelManager from '../../utils/modelmanager';
import PropTypes from 'prop-types';
import { AppContext } from '../../utils/context';
import { Helmet } from 'react-helmet-async';
import Delayed from '../../utils/delayed';
import Header from '../header';
import Navigation from '../navigation';
import Footer from '../footer';
import { useGraphQL } from '../../utils/useGraphQL';
import Loading from '../loading';
import './screen.css';

const Screen = () => {
  const context = useContext(AppContext);
  const [title] = useState('');

  const persistentQuery = 'screen';

  const { data, errorMessage } = useGraphQL(persistentQuery, { tags: 'shopbop:location/home', locale: context.lang });

  if (errorMessage) return;

  if (!data) return <Loading />;

  return (
    <React.Fragment>
      <Helmet>
        <title>Shopbop {title}</title>
      </Helmet>
      <header>
        <Header key='header' />
        <Navigation key='navigation' />
      </header>

      {data && data.screenList.items.map((item) => (
        <div key={item.path} className='main-body'
          data-aue-type='container'
          data-aue-behavior='component'
          data-aue-filter='screen'
          data-aue-label={item._model.title}
          data-aue-model={item._model._path}
          data-aue-prop='block'
          data-aue-resource={`urn:aemconnection:${item._path}/jcr:content/data/${item._variation}`}>
          <div className='main-hero'>
            <ModelManager key={item.path} content={item.hero} dataProp='hero' dataBehavior=''></ModelManager>
          </div>
          {item && item.blocks.map((block, i) => (
            <Delayed key={block._path + '_' + i} waitBeforeShow={200}>
              <div className='block'>
                <ModelManager content={block} dataProp='block' dataBehavior='component'></ModelManager>
              </div>
            </Delayed>
          ))}
        </div>
      ))}
      <footer>
        <Footer key='footer' />
      </footer>
    </React.Fragment>
  );
};

Screen.propTypes = {
  content: PropTypes.object
};

export default Screen;