import React, { useState } from 'react';
import { useGraphQL } from '../../utils/useGraphQL';
import Loading from '../loading';
import Panel from '../panel';
import Search from '../../media/search.svg';

import './navigation.css';

const Navigation = () => {
  const [panel, setPanel] = useState(null);
  const [style, setStyle] = useState('');
  
  const persistentQuery = 'navigation';
  const { data, errorMessage } = useGraphQL(persistentQuery);

  if (errorMessage) return;

  let navs = [];
  if (!data) return <Loading />;
  else {
    navs = data.navigationList.items;
  }

  const changeHTML = (element) => {
    const div = document.createElement('div');
    div.innerHTML = element;
    const ul = div.querySelector('ul');
    let i = 0;
    const ret = [...ul.children].map((li) => {

      const anchor = li.querySelector('a');
      let NewAnchor = '';
      if (anchor) {
        const dataPanel = anchor.textContent.replace('\'', '').replace(' ', '-').toLowerCase();
        [...li.childNodes].forEach((item) => {
          if (item.nodeName != '#text') {
            [...item.childNodes].forEach(({ nodeName, textContent, href }) => {
              const TagName = nodeName.toLowerCase();
              const ParentName = `${item.nodeName.toLowerCase()}`;
              NewAnchor = <ParentName key={dataPanel}>
                <TagName href={href} title={dataPanel}
                  onMouseEnter={() => {setPanel(dataPanel);setStyle('show');}} 
                  onMouseLeave={() => {setStyle('');}} data-panel={dataPanel}>{textContent}</TagName></ParentName>;

            });
          }

        });
      }
      if (anchor)
        return (<li key={i++}>{NewAnchor}</li>);
      return (<li key={i++} dangerouslySetInnerHTML={{ __html: li.innerHTML }} />);
    });

    return ret;
  };
  
  return (
    <nav>
      {navs && navs.map((nav) => (
        <div className='navigation' role='menubar' key={nav._path}>
          <ul>
            {changeHTML(nav.navigationItems.html)}
            <img className='search' src={Search} />
          </ul>

        </div>
      ))}
      <Panel style={style} panel={panel} />
    </nav>
  );
};

export default Navigation;