import React from 'react';
import styled from 'styled-components';
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
    return (
        <MoviePosterItem key={id}>
            <MoviePosterLink to={`/details/${id}`}>
                <PosterWrap>
                    <MoviePoster
                        title={title}
                        imageSize="w200"
                        image={poster_path}
                    />
                    <HoverOverlay text="View more" />
                </PosterWrap>
                <MovieTitle>{title}</MovieTitle>
            </MoviePosterLink>
        </MoviePosterItem>
    );
};

export default RelatedMovie;
