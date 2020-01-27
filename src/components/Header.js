import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.header`
    background-color: #282c34;
    height: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 2rem;
    margin-bottom: 4rem;
    // cursor: pointer;
`;

const Heading = styled.h1`
    a {
        font-size: 2.4rem;
        color: white;
        text-decoration: none;

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
`;

const Header = ({ text }) => {
    return (
        <HeaderWrapper>
            <Heading>
                <a href="/">{text}</a>
            </Heading>
        </HeaderWrapper>
    );
};

Header.propTypes = {
    text: PropTypes.string.isRequired
};

export default Header;
