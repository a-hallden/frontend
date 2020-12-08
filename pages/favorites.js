import React from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import Link from "next/link";
import * as actions from "../redux/favorites/actions";
import styled from "styled-components";
import { Button } from "reactstrap";

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const MovieTitle = styled(Link)`
  font-size: 18px;
`;

const DeleteButton = styled(Button)`
  float: right;
  font-size: 18px;
  color: white;
`;

const FavoritesContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesName: "",
    };
  }

  componentDidMount = () => this.props.getFavorites();

  renderMovie = (movie) => (
    <div key={movie.imdbID}>
      <MovieTitle href={`movies/${movie.imdbID}`}>{movie.name}</MovieTitle>
    </div>
  );

  renderFavorite = (favorite) => (
    <FavoritesContainer key={favorite.id}>
      <Title>{favorite.name}</Title>
      <DeleteButton color="danger">X</DeleteButton>
      {favorite.movies.map((movie) => this.renderMovie(movie))}
    </FavoritesContainer>
  );

  renderFavorites = () => {
    const {
      favorites: { results, loading, error },
    } = this.props;

    if (loading) return "Laddar...";
    if (error) return <>Fel uppstod: {error}</>;
    return results.length
      ? results.map((favorite) => this.renderFavorite(favorite))
      : "Inga skapade ännu";
  };

  onChange = ({ target: { value } }) => this.setState({ favoritesName: value });

  createNewFavorites = () =>
    this.props.createNewFavorites({ name: this.state.favoritesName });

  render() {
    const { favoritesName } = this.state;
    return (
      <Layout>
        <input type="text" value={favoritesName} onChange={this.onChange} />
        <button onClick={this.createNewFavorites}>Lägg till ny</button>
        {this.renderFavorites()}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  favorites: state.favorites.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  getFavorites: () => dispatch(actions.getFavorites(dispatch)),
  createNewFavorites: (payload) =>
    dispatch(actions.createNewFavorites(dispatch, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
