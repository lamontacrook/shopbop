import React, { useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Image from '../image/image';
import { mapJsonRichText } from '../../utils/renderRichText';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './collections-carousel.css';

const imageSizes = [
  {
    imageWidth: '660px',
    renditionName: 'web-optimized-large.webp',
    size: '(min-width: 1000px) 660px'
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
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    size: '100vw',
  }
];

const CollectionsCarousel = ({ content, config, editorProps, component = true }) => {
  const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };

  editorProps['data-aue-type'] = 'container';

  if (content.style === 'slider') return <SliderCarousel content={content} config={config} imageProps={imageProps} />;
  else return <StaticCarousel editorProps={editorProps} content={content} config={config} imageProps={imageProps} />;
};

CollectionsCarousel.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
  component: PropTypes.bool,
  editorProps: PropTypes.object
};

const StaticCarousel = ({ content, editorProps }) => {
  editorProps['data-aue-prop'] = 'collectionItems';
  return (
    <div className='coll-carousel static' {...editorProps}>
      {mapJsonRichText(content.head.json)}
      <div className="carousel">
        {content.collectionItems && content.collectionItems.map((item, i) => (
          <CarouselItem editorProps={editorProps} key={i} content={item} />
        ))}
      </div>
    </div>
  );
};

StaticCarousel.propTypes = {
  content: PropTypes.object,
  editorProps: PropTypes.object
};

const SliderCarousel = ({ content, imageProps, config, editorProps }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    afterChange: (slideIndex) => setCurrentSlide(slideIndex),
  };

  return (
    <div className='coll-carousel slider'>
      <h2>Latest Collections</h2>
      <div className="carousel">
        <Slider {...settings}>
          {content.collectionItems && content.collectionItems.map((item, i) => (
            <CarouselItem content={item} editorProps={editorProps} key={i} />
          ))}
        </Slider>

      </div>
    </div>
  );
};

SliderCarousel.propTypes = {
  content: PropTypes.object,
  imageProps: PropTypes.object,
  config: PropTypes.object,
  editorProps: PropTypes.object
};

const CarouselItem = ({ content, editorProps }) => {
  const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };

  editorProps['data-aue-resource'] = `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`;
  editorProps['data-aue-label'] = content.title;
  editorProps['data-aue-model'] = content?._model?._path;
  editorProps['data-aue-behavior'] = 'component';
  editorProps['data-aue-prop'] = 'collectionItems';
  
  console.log(content);

  return (
    <div className="carousel-item" {...editorProps}>
      <Image imageProps={imageProps} asset={content.asset} alt={content.title} imageSizes={imageSizes} />
      <h3 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h3>
      {content.description && <span data-aue-prop='description' data-aue-type='description' data-aue-label='Description' dangerouslySetInnerHTML={{ __html: content.description.html }} />}
      <a href={content.link}>{content.callToAction}</a>
    </div>
  );
};

CarouselItem.propTypes = {
  content: PropTypes.object,
  editorProps: PropTypes.object
};

export default CollectionsCarousel;