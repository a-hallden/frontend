import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/favorites/actions";
import Layout from "../components/Layout";
import MovieListItem from "../components/MovieListItem";
import { Row } from "reactstrap";
import styled from "styled-components";

const StyledRow = styled(Row)`
  margin: 0;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  onChange = ({ target: { value } }) => this.setState({ searchTerm: value });

  search = () => this.props.search(this.state.searchTerm);

  renderSearchResults = () => {
    const {
      searchResults: { results },
      addToFavorites,
    } = this.props;
    return (
      <>
        <StyledRow>
          {results.map((movie) => (
            <MovieListItem
              movie={movie}
              key={movie.imdbID}
              addToFavorites={(value) => {
                console.log("ADDING", value);
                addToFavorites(value);
              }}
            />
          ))}
        </StyledRow>
      </>
    );
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <Layout>
        <input type="text" onChange={this.onChange} value={searchTerm} />
        <button onClick={this.search}>get</button>
        {this.renderSearchResults()}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.favorites.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
  search: (searchTerm) => dispatch(actions.search(dispatch, searchTerm)),
  addToFavorites: (movie) => dispatch(actions.addToFavorites(dispatch, movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
