import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { mapJsonRichText } from '../../utils/renderRichText';
import { AppContext } from '../../utils/context';
import './productlist.css';

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

const ProductList = ({ content, editorProps }) => {
  const context = useContext(AppContext);
  const [products, setProducts] = useState(null);

  const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };

  useEffect(() => {
    fetch('https://main--cif--jihuang-adobe.hlx.page/products.json?sheet=shopbot').then((res) => {
      if (res) {
        res.json().then((json) => setProducts(json.data));
      }
    }).catch((error) => {
      throw (error);
    });
  }, []);

  const findProduct = (product, sku) => {
    return product.product_sku === sku;
  };

  const retrieveProduct = (sku) => {
    if (!products) return;
    const product = products.find((item) => findProduct(item, sku));

    return (
      <React.Fragment>
        <img src={context.serviceURL + product.category_image} />
        <div className='list-item-content'> 
          <span className='product-name'>{product.product_name}</span>
          <span className='product-description'>{product.product_description}</span>
          <span className='product-price'>{product.product_price}</span>
          <button aria-label="button" className='product-favorite'></button>
        </div>
      </React.Fragment>
    );
  };

  const productProps = {
    'data-aue-prop': 'products',
    'data-aue-type': 'reference',
    'data-aue-label': 'Products'
  };

  return (
    <div className='productlist' {...editorProps}>
      <div className='product-list-title'>
        {mapJsonRichText(content?.headline?.json)}
        <button className="shop-all" aria-label="button">Shop All</button>
      </div>
      <div className='list-items'>
        {products && content.products && content.products.map((product) => (
          <div key={product} className='list-item' {...productProps}>
            {retrieveProduct(product)}
          </div>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  content: PropTypes.object,
  editorProps: PropTypes.object
};

export default ProductList;


//https://author-p124331-e1227315.adobeaemcloud.com/content/dam/amazon/assets/products/ullaj2263510687_1709571240895_2-0-_QL90_UX282_.jpg/_jcr_content/renditions/original?ch_ck=1711387638000