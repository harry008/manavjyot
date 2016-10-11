import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { Heading, Row, Col, Grid, TextBlock } from 'components';
import Slider from './Slider';
// import './Home.scss';

class Home extends Component {

  render() {
    return (
      <div style={ { marginTop: '60px' } }>
        <Helmet title="Home" />
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
               <Card>
                <CardHeader
                  title="Our Mission"
                />
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Officiis, quia recusandae aliquid similique voluptate ipsam, corporis,
                  laudantium autem accusantium ut commodi repellendus.
                  Voluptates animi enim blanditiis, quod aspernatur. Dolore, minima.
                </CardText>
                <CardActions>
                  <FlatButton label="View Details" />
                </CardActions>
            </Card>
            </Col>
            <Col md={1} xs={1} />
            <Col xs={ 12 } sm={ 10 } md={ 3 } className="point">
                <Card>
                  <CardHeader
                    title="Latest Projects"
                  />
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officiis, quia recusandae aliquid similique voluptate ipsam, corporis,
                    laudantium autem accusantium ut commodi repellendus.
                    Voluptates animi enim blanditiis, quod aspernatur. Dolore, minima.
                  </CardText>
                  <CardActions>
                    <FlatButton label="View Details" />
                  </CardActions>
                </Card>
            </Col>
            <Col md={1} xs={1} />
            <Col xs={ 12 } sm={ 10 } md={ 3 } className="point">
                 <Card>
                  <CardHeader
                    title="Latest Projects"
                  />
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officiis, quia recusandae aliquid similique voluptate ipsam, corporis,
                    laudantium autem accusantium ut commodi repellendus.
                    Voluptates animi enim blanditiis, quod aspernatur. Dolore, minima.
                  </CardText>
                  <CardActions>
                    <FlatButton label="View Details" />
                  </CardActions>
                </Card>
            </Col>
          </Row>
          <Row className="site-more-info">
            <Col xs={ 10 } sm={ 10 } md={ 5 }>
              <Card>
                  <CardHeader
                      title="About US"
                  />
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquam itaque accusamus molestias quo sunt obcaecati ex suscipit,
                    animi ab praesentium odio quisquam, iusto atque ipsam voluptatibus illum blanditiis, saepe natus.
                  </CardText>
                  <CardActions>
                    <FlatButton label="View Details" />
                  </CardActions>
              </Card>
            </Col>
            <Col xs={12} md={2}  sm={1}/>
            <Col xs={12} sm={10} md={5}>
              <Card>
                  <CardHeader title="Successful Stories"/>
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dolorum illo aspernatur reiciendis saepe, eos voluptatum quibusdam maiores tempora animi ipsam
                    quod consectetur itaque,
                    nostrum suscipit delectus minus adipisci officiis voluptatibus.
                  </CardText>
                  <CardActions>
                    <FlatButton label="View Details" />
                  </CardActions>
              </Card>
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
