import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../../redux/favorites/actions";
import Layout from "../../components/Layout";
import { Row, Col } from "reactstrap";

class MovieDetail extends React.Component {
  componentDidMount = () => {
    const {
      router: { query },
      getMovieDetail,
    } = this.props;
    getMovieDetail(query.imdbID);
  };

  render() {
    const {
      movieDetail: { result, loading, error },
    } = this.props;
    console.log("result", result, loading);

    return (
      <Layout>
        {loading || !result ? (
          "Laddar..."
        ) : (
          <Row>
            <Col xs={12} sm={6}>
              <h2>{result.Title}</h2>
              <div>Skådespelare: {result.Actors}</div>
              <div>Priser; {result.Awards}</div>
              <div>Land: {result.Country}</div>
              <div>Regissör. {result.Director}</div>
              <div>Genre: {result.Genre}</div>
              <div>Språk: {result.Language}</div>
              <div>Metascore: {result.Metascore}</div>
              <div>Handling: {result.Plot}</div>
            </Col>
            <Col xs={12} sm={6}>
              <img src={result.Poster} />
            </Col>
          </Row>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  movieDetail: state.favorites.movieDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieDetail: (imdbID) =>
    dispatch(actions.getMovieDetail(dispatch, imdbID)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieDetail)
);
