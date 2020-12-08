import React from "react";
import styled from "styled-components";
import { Button, Col } from "reactstrap";

const Container = styled(Col)`
  line-height: 24px;
  background-color: white;
  padding: 8px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Information = styled.div`
  width: 70%;
`;

const Poster = styled.div`
  width: 30%;
  img {
    height: 300px;
    width: auto;
    float: right;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #666;
  margin-right: 12px;
  vertical-align: baseline;
`;

const Year = styled.div`
  font-size: 18px;
  line-height: 28px;
  font-style: italic;
  vertical-align: baseline;
`;

const FavoriteButton = styled(Button)`
  width: 100%;
  background-color: #28a745;
  color: white;
  font-size: 32px;
  border: none;
`;

const MovieListItem = ({ movie, addToFavorites }) => (
  <Container xs={12} sm={6}>
    <InnerContainer>
      <Information>
        <Title>{movie.Title}</Title>
        <Year>{movie.Year}</Year>
      </Information>
      <Poster>
        <img src={movie.Poster} />
      </Poster>
    </InnerContainer>
    <FavoriteButton color="success" onClick={() => addToFavorites(movie)}>
      +
    </FavoriteButton>
  </Container>
);

export default MovieListItem;
