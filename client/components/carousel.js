import React from 'react';
import Carousel from 'nuka-carousel';
import StoryCard from './cards/storyCard'


export default class extends React.Component {


  render() {

    console.log(this.props.items)
    return (
      <div id = "carouselWrapper">
      <Carousel
       autoplay = {true}
      cellSpacing ={50}
      framePadding="0"
      frameOverflow={'visible'}
      width= "100%"
      initialSlideHeight="200px"
      dragging =  {true}
      slidesToShow = {5}
      // wrapAround = {true}
      renderBottomCenterControls={false}
      renderRightCenterControls={false}
      autoplayInterval={2000}

      // renderTopCenterControls={({ currentSlide }) => (
      //   <div>Slide: {currentSlide}</div>
      // )}
      // renderCenterLeftControls={({ previousSlide }) => (
      //   <button onClick={previousSlide}>Previous</button>
      // )}
      // renderCenterRightControls={({ nextSlide }) => (
      //   <button onClick={nextSlide}>Next</button>
      // )}
    >


        {this.props.items.map((story) => <StoryCard specialClassName = "carouselCard" story = {story} />)}
      </Carousel>
      </div>
    );
  }
}

