import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Nav = styled.div`
  position: sticky;
  top: 0;
  border-radius: 0;
  z-index: 1;
  background-color: gray;

  nav.styled-nav {
    position: sticky;
    top: 0;
  }

  nav.styled-nav a.white {
    color: #fff !important;
  }

  nav.styled-nav a:hover {
    text-decoration: none;
  }

  ul {
    position: relative;
    display: flex;
    justify-content: space-evenly;

    li {
      display: flex;
      align-items: center;
      color: white;
      cursor: pointer;
      align-items: center;
      transition: 0.25s all;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      min-height: 3rem;

      &:hover {
        background-color: lightgray;
      }
    }
  }

  & > button {
    cursor: pointer;
  }
`;

const Menu = () => (
  <Nav>
    <ul>
      <Link href="/">
        <li>Sök</li>
      </Link>
      <Link href="/favorites/">
        <li>Favoriter</li>
      </Link>
    </ul>
  </Nav>
);

export default Menu;
