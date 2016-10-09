import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {Heading, Card, Row, Col, Grid, TextBlock} from 'components';
import Slider from './Slider';
import './Home.scss';

class Home extends Component {

  render() {
    return (
      <div style={ {marginTop: '60px'} }>
        <Helmet title="Home"/>
        <Grid>
          <Row>
            <Col xs={ 12 } md={ 6 } sm={ 12 }>
              <Slider />
            </Col>
            <Col xs={ 12 } sm={ 12 } md={ 4 } className="home--sidebar">
              <Link to="/donation" className="btn btn-block donate">
                DONATE
              </Link>
              <div>
                <h3>We can change the life of those who have no hope</h3>
              </div>
              <div>
                <p>Make little effort to help the people.</p>
              </div>
            </Col>
          </Row>
          <Row className="points-row">
            <Col xs={ 12 } sm={ 10 } md={ 3 } className="point">
              <Heading type={'h3'}>Our Mission</Heading>
              <div className="pad">
                Faert sit amet est l,mmodo venenatis eros. Kusce ng quam id risus sagittisnel consequat
                lacusut tinn sodales arcuisqum.
                <div className="alright">
                  <a href="#" className="btn">View details »</a>
                </div>
              </div>
            </Col>
            <Col md={1} xs={1} />
            <Col xs={ 12 } sm={ 10 } md={ 3 } className="point">
              <Heading type={'h3'}>Latest Projects</Heading>
              <div className="pad">
                Keet sit amet est el,mmodo venenatis eros. Fusce ng quam id risus sagittisnel consequat
                lacusut tinn sodales arcuisque.
                <div className="alright">
                  <a href="#" className="btn">View details »</a>
                </div>
              </div>
            </Col>
            <Col md={1} xs={1} />
            <Col xs={ 12 } sm={ 10 } md={ 3 } className="point">
              <Heading type={'h3'}>Participate</Heading>
              <div className="pad">
                Holot sit amet est el,mmodo venenatis eros. Jolosceng huam id risus sagittisnel consequat
                lacusut tinn sodales arcuisqmol.
                <div className="alright">
                  <a href="#" className="btn">View details »</a>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="site-more-info">
            <Col xs={ 10 } sm={ 10 } md={ 5 }>
              <div className="story">
                <h2 className="story--title">
                  Successful Stories
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut blanditiis corporis
                  cupiditate deserunt dolores ex illo necessitatibus neque nesciunt quam qui rerum saepe
                  similique sint tempore tenetur, vero voluptate.
                </p>
              </div>
              <div className="alright">
                <a href="#" className="btn">View details »</a>
              </div>
            </Col>
            <Col xs={1} md={2}/>
            <Col xs={ 10 } sm={ 10 } md={ 5 }>
              <div className="short-intro">
                <h2 className="intro--title">
                  About Us
                </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dolor nulla
                  officiis
                  qui unde! Aut commodi ipsam laborum modi quis repellendus temporibus. Aliquam illo
                  impedit iusto mollitia quia quos ut!</p>
              </div>
              <div className="alright">
                <a href="#" className="btn">View details »</a>
              </div>
            </Col>
          </Row>
          <Row className="footer">
            <hr className="footer-hr-line"/>
            <Col xs={ 12 } sm={ 10 } md={ 4 }>
              <p className="copy">
                <strong>Manav Jyot Charity</strong>   &copy; <span id="copyright-year">2016</span> <br/>
                Website designed by Hiren, Salim & Chirag
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
