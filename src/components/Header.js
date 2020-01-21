import React from 'react';
import styled from 'styled-components';

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
    font-size: 2.4rem;
`;

const Header = ({ text }) => {
    return (
        <HeaderWrapper>
            <Heading>{text}</Heading>
        </HeaderWrapper>
    );
};

export default Header;
