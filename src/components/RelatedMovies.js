import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';
import HoverOverlay from '../components/HoverOverlay';

const MoviePosterItem = styled.li`
    width: 23%;
    padding: 1%;
    list-style: none;

    img {
        display: block;
        width: 100%;
    }
`;

const MovieTitle = styled.div`
    text-align: center;
`;

const PosterWrap = styled.div`
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
`;

const MoviePosterLink = styled(Link)`
    position: relative;
    display: block;
    height: 100%;
`;

const RelatedMovie = ({ id, title, poster_path }) => {
    const [mouseOver, setMouseOver] = useState('false');

    const manageMouseOver = e => {
        setMouseOver('true');
    };

    const manageMouseOut = e => {
        setMouseOver('false');
    };

    return (
        <MoviePosterItem key={id}>
            <MoviePosterLink
                to={`/details/${id}`}
                onMouseOver={manageMouseOver}
                onMouseOut={manageMouseOut}
            >
                <PosterWrap>
                    <MoviePoster
                        title={title}
                        imageSize="w200"
                        image={poster_path}
                    />
                    <HoverOverlay
                        prepend="View "
                        text={title}
                        mouseOver={mouseOver}
                    />
                </PosterWrap>
                <MovieTitle>{title}</MovieTitle>
            </MoviePosterLink>
        </MoviePosterItem>
    );
};

RelatedMovie.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string
};

export default RelatedMovie;
