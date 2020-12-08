import React from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import Link from "next/link";
import * as actions from "../redux/favorites/actions";
import styled from "styled-components";

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const MovieTitle = styled(Link)`
  font-size: 18px;
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
    <div key={favorite.id}>
      <Title>{favorite.name}</Title>
      {favorite.movies.map((movie) => this.renderMovie(movie))}
    </div>
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

  render() {
    const { favoritesName } = this.state;
    return (
      <Layout>
        <button onClick={() => console.log(this.state)}>state</button>
        <input type="text" value={favoritesName} onChange={this.onChange} />
        <button onClick={this.createFavorites}>Lägg till ny</button>
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
  createNewFavorite: (name) =>
    dispatch(actions.createNewFavorite(dispatch, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
