import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './utils/context';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/error';
import Screen from './components/screen';
import { useGraphQL } from './utils/useGraphQL';
import Loading from './components/loading';

import './App.css';

function App() {
  const context = useContext(AppContext);
  const persistentQuery = 'configuration';
  const { data, errorMessage } = useGraphQL(persistentQuery, { project: `${context.project}/configuration` });

  if (errorMessage) throw new Error(errorMessage);

  if (!data) return <Loading />;


  if (data) {
    context.commerceSheet = data.configurationByPath.item.commerceSheet;
  }

  let {serviceURL} = context;
  serviceURL = serviceURL.endsWith('/') ? serviceURL.slice(0, -1) : serviceURL;
  
  return (
    <HelmetProvider>
      <div className='App'>
        <Helmet>
          <meta name='urn:adobe:aue:system:aemconnection' content={`aem:${serviceURL}`} />
        </Helmet>
        <BrowserRouter>
          <Routes>
            <Route exact={true} path={'/:lang?'} element={
              <ErrorBoundary
                FallbackComponent={Error}
                onReset={() => {
                  console.log('reset');
                }}>
                <Screen />
              </ErrorBoundary>}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
