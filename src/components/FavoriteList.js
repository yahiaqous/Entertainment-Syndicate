import React, { Component } from 'react';
import { Card, Button, CardGroup, CardDeck } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Feedback from './Feedback';

export class FavoriteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      favoriteAnime: [],
      favoriteMovie: [],
      favoriteGame: [],

      index: '',
      type: '',
      feedback: '',
      feedbackModal: false,
    };
  }

  // 6- Get Favorite data from database
  // Third request
  componentDidMount = () => {
    let email = this.props.auth0.user.email;
    axios
      .get(`http://localhost:3001/favorite`, { params: { email } })
      .then((res) => {
        this.setState({
          favoriteList: res.data,
          favoriteAnime: res.data.favoriteAnime,
          favoriteMovie: res.data.favoriteMovie,
          favoriteGame: res.data.favoriteGame,
        });
        console.log(this.state.favoriteAnime);
      });
  };

  // 7  delete Favorite data from database
  // 4th req

  delete = async (index, type) => {
    console.log('test delete');

    let { user } = this.props.auth0;
    console.log(type);

    let deleteFavorite = await axios.delete(
      `http://localhost:3001/favorite/${index}`,
      {
        params: { email: user.email, type: type },
      }
    );

    this.setState({
      favoriteList: deleteFavorite.data,
      favoriteAnime: deleteFavorite.data.favoriteAnime,
      favoriteMovie: deleteFavorite.data.favoriteMovie,
      favoriteGame: deleteFavorite.data.favoriteGame,
    });
  };

  showFeedbackModal = (idx, feedback, type) => {
    this.setState({
      feedbackModal: true,
      feedback: feedback,
      type: type,
      index: idx,
    });
  };

  hideFeedbackModal = () => {
    this.setState({
      feedbackModal: false,
    });
  };

  changeFeedback = (e) => {
    // console.log(' hello onChange');
    this.setState({
      feedback: e.target.value,
    });
    // console.log(this.state.feedback);
  };

  // 8 update feedback
  //5th req
  updateFeedback = async () => {
    // console.log('Inside update');
    let type = this.state.type;
    let index = this.state.index;
    let { user } = this.props.auth0;
    let feedback = this.state.feedback;
    console.log(feedback);

    let updatedFeedback = await axios.put(
      `http://localhost:3001/feedback/${index}`,
      {
        email: user.email,
        type: type,
        feedback: feedback,
      }
    );
    this.setState({
      favoriteList: updatedFeedback.data,
      favoriteAnime: updatedFeedback.data.favoriteAnime,
      favoriteMovie: updatedFeedback.data.favoriteMovie,
      favoriteGame: updatedFeedback.data.favoriteGame,
    });

    this.hideFeedbackModal();
  };

  // 9 update(delete) feedback
  //5th req
  deleteFeedback = async () => {
    await this.setState({
      feedback: '',
    });
    this.updateFeedback();
  };

  render() {
    return (
      <div>
        {this.state.favoriteAnime.length !== 0 && (
          <div>
            <h2>Anime</h2>
            <CardDeck>
              {this.state.favoriteAnime.map((item, idx) => {
                return (
                  <CardGroup key={idx} style={{ width: '22rem' }}>
                    <Card>
                      <Card.Img variant="top" src={item.image} />

                      <Card.Body>
                        <Card.Title> {item.title}</Card.Title>
                        <Card.Text>Description: {item.description}</Card.Text>
                        <Card.Text>Date: {item.date}</Card.Text>
                        <Card.Text>Type: {item.type}</Card.Text>
                        <Card.Text>Category: {item.category}</Card.Text>
                        <Card.Text>Episodes: {item.episodes}</Card.Text>
                        <Card.Text>Score: {item.score}</Card.Text>
                        <Card.Text>Rating: {item.rate}</Card.Text>
                        <a href={item.watchURL}>Watch Here</a>
                      </Card.Body>
                      <Card.Footer>
                        {/* 7  , 4th req */}
                        <Button
                          variant="danger"
                          onClick={() => this.delete(idx, item.type)}
                        >
                          Delete
                        </Button>
                        {/* add input field  on submiit and a place to put it and the  && */}
                        <Button
                          variant="primary"
                          onClick={() =>
                            this.showFeedbackModal(
                              idx,
                              item.feedback,
                              item.type
                            )
                          }
                        >
                          feedback
                        </Button>
                      </Card.Footer>
                    </Card>
                  </CardGroup>
                );
              })}
            </CardDeck>
          </div>
        )}

        {this.state.favoriteMovie.length !== 0 && (
          <div>
            <h2>Movies</h2>
            <CardDeck>
              {this.state.favoriteMovie.map((item, idx) => {
                return (
                  <CardGroup key={idx} style={{ width: '22rem' }}>
                    <Card>
                      <Card.Img variant="top" src={item.image} />

                      <Card.Body>
                        <Card.Title> {item.title}</Card.Title>
                        <Card.Text>Description: {item.description}</Card.Text>
                        <Card.Text>Date: {item.date}</Card.Text>
                        <Card.Text>Type: {item.type}</Card.Text>
                        <Card.Text>Category: {item.category}</Card.Text>
                        <Card.Text>Vote Average: {item.voteAverage}</Card.Text>
                        <Card.Text>Vote Count: {item.voteCount}</Card.Text>
                        <Card.Text>Popularity: {item.popularity}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        {/* 7  , 4th req */}
                        <Button
                          variant="danger"
                          onClick={() => this.delete(idx, item.type)}
                        >
                          Delete
                        </Button>
                        {/* add input field  on submiit and a place to put it and the  && */}
                        <Button
                          variant="primary"
                          onClick={() =>
                            this.showFeedbackModal(
                              idx,
                              item.feedback,
                              item.type
                            )
                          }
                        >
                          feedback
                        </Button>
                      </Card.Footer>
                    </Card>
                  </CardGroup>
                );
              })}
            </CardDeck>
          </div>
        )}

        {this.state.favoriteGame.length !== 0 && (
          <div>
            <h2>Games</h2>
            <CardDeck>
              {this.state.favoriteGame.map((item, idx) => {
                return (
                  <CardGroup key={idx} style={{ width: '22rem' }}>
                    <Card>
                      <Card.Img variant="top" src={item.image} />
                      <Card.Body>
                        <Card.Title> {item.title}</Card.Title>
                        <Card.Text>Description: {item.description}</Card.Text>
                        <Card.Text>Date: {item.date}</Card.Text>
                        <Card.Text>Type: {item.type}</Card.Text>
                        <Card.Text>Category: {item.category}</Card.Text>
                        <Card.Text>Platform: {item.platform}</Card.Text>
                        <Card.Text>Publisher: {item.publisher}</Card.Text>
                        <Card.Text>Developer: {item.developer}</Card.Text>
                        <a href={item.installingURL}>Install from Here</a>
                      </Card.Body>
                      <Card.Footer>
                        {/* 7  , 4th req */}
                        <Button
                          variant="danger"
                          onClick={() => this.delete(idx, item.type)}
                        >
                          Delete
                        </Button>
                        {/* add input field  on submiit and a place to put it and the  && */}
                        <Button
                          variant="primary"
                          onClick={() =>
                            this.showFeedbackModal(
                              idx,
                              item.feedback,
                              item.type
                            )
                          }
                        >
                          feedback
                        </Button>
                      </Card.Footer>
                    </Card>
                  </CardGroup>
                );
              })}
            </CardDeck>
          </div>
        )}

        <Feedback
          feedbackModal={this.state.feedbackModal}
          hideFeedbackModal={this.hideFeedbackModal}
          feedback={this.state.feedback}
          type={this.state.type}
          index={this.state.index}
          changeFeedback={this.changeFeedback}
          updateFeedback={this.updateFeedback}
          deleteFeedback={this.deleteFeedback}
        />
      </div>
    );
  }
}

export default withAuth0(FavoriteList);
