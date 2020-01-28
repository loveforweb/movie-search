import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const HoverCard = styled.div`
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
    text-align: center;
    color: white;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;

    ${props =>
        props.hover === 'true' &&
        css`
            opacity: 1;
        `}

    &:before {
        content: '';
        background-color: rgba(0, 0, 0, 0);
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: background-color 0.25s ease-in-out;

        ${props =>
            props.hover === 'true' &&
            css`
                background-color: rgba(0, 0, 0, 0.6);
            `}
    }

    span {
        position: relative;
        z-index: 1;
    }
`;

const HoverOverlay = ({ prepend, text, mouseOver }) => {
    return (
        <HoverCard hover={mouseOver}>
            <span>
                {prepend && prepend}
                <strong>{text}</strong>
            </span>
        </HoverCard>
    );
};

HoverOverlay.proTypes = {
    text: PropTypes.string.isRequired
};

export default HoverOverlay;
