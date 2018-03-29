import React from 'react';
import Carousel from 'nuka-carousel';
import StoryCard from './cards/storyCard'


export default class extends React.Component {


  render() {
    return (
      <div id="carouselWrapper">
        <Carousel
          autoplay={true}
          // cellSpacing={1}
          framePadding="0"
          frameOverflow="visible"
          width="100%"
          dragging={true}
          slidesToShow={5}
          wrapAround={true}
          renderBottomCenterControls={false}
          renderRightCenterControls={false}
          autoplayInterval={3200}
        >
          {this.props.items.map((story) => <StoryCard specialClassName="carouselCard" story={story} />)}
        </Carousel>
      </div>
    );
  }
}

