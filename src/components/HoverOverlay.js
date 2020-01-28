import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HoverCard = styled.div`
    position: absolute;
    height: 100%;
    top: 0;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;

    &:after {
        content: '';
        background: rgba(0, 0, 0, 0.5);
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        opacity: 0;
    }

    &:hover {
        opacity: 1;
        &:after {
            opacity: 0.7;
            transition: opacity 0.25s ease-in-out;
        }
    }
`;

const HoverOverlay = ({ text }) => {
    return <HoverCard>{text}</HoverCard>;
};

HoverOverlay.proTypes = {
    text: PropTypes.string.isRequired
};

export default HoverOverlay;
