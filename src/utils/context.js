import { createContext } from 'react';
import BrokenImage from '../media/broken.jpg';

const defaultEndpoint = 'headless';
const defaultProject = '/content/dam/amazon';
const defaultServiceURL = 'https://author-p124903-e1228403.adobeaemcloud.com/';

export const AppContext = createContext({
  endpoint: localStorage.endpoint || defaultEndpoint,
  project: localStorage.project || defaultProject,
  serviceURL: localStorage.serviceURL || defaultServiceURL,
  commerceSheet: '',
  panels: {},
  navigation: {}
});
