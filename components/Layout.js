import React from "react";
import styled from "styled-components";
import Head from "next/Head";
import Menu from "./Menu";

const ChildContainer = styled.div`
  @media (min-width: 1200px) {
    padding: 1rem;
    max-width: 1200px;
    margin: auto;
  }

  background-color: #eee;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow: auto;

  font-family: benton-sans, sans-serif;
  font-style: normal;
  font-weight: 500;

  ::-webkit-scrollbar {
    display: none;
  }
`;

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>Movie search</title>
        </Head>
        <Menu />
        <ChildContainer>{this.props.children}</ChildContainer>
      </div>
    );
  }
}

export default Layout;
