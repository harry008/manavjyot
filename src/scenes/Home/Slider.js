import React, { Component, PropTypes } from 'react';

import Wallop from 'Wallop';

// import './wallop.scss';
// import './wallop--slide.scss';

import IMG1 from './imgs/page1_img1.jpg';
import IMG2 from './imgs/page1_img2.jpg';
import IMG3 from './imgs/page1_img3.jpg';


class Slider extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    const wollapEl = this.refs.Wallop;
    const slider = new Wallop(wollapEl);
    this.timer = setInterval(_ => slider.next(), 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div ref="Wallop" className="Wallop Wallop--slide">
        <div className="Wallop-list">
          <div className="Wallop-item">
            <img src={ IMG1 } alt="Image 1"/>
          </div>
          <div className="Wallop-item">
            <img src={ IMG2 } alt="Image 2"/>
          </div>
          <div className="Wallop-item">
            <img src={ IMG3 } alt="Image 3"/>
          </div>
        </div>
        {/* <button className="Wallop-buttonPrevious">Previous</button>
         <button className="Wallop-buttonNext">Next</button> */}
      </div>
    );
  }
}

export default Slider;
