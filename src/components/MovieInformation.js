import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MoviePoster from '../components/MoviePoster';

const ImageWrapper = styled.div`
    margin-right: 2rem;
`;

const InfoWrapper = styled.div``;

const ItemWrapper = styled.div`
    margin-bottom: 1.2rem;
    span {
        font-weight: bold;
    }
`;

const TitleWrapper = styled.h2`
    font-size: 3rem;
    margin-top: 0;

    span {
        font-size: 1.8rem;
    }
`;

const PlotItem = styled.p``;

const MovieInformation = ({
    title,
    release_date,
    genres,
    vote_average,
    overview,
    poster_path
}) => {
    return (
        <>
            {title && (
                <ImageWrapper>
                    <MoviePoster
                        title={title}
                        imageSize="w200"
                        image={poster_path}
                    />
                </ImageWrapper>
            )}
            <InfoWrapper>
                <TitleWrapper>
                    {title} <span>({release_date})</span>
                </TitleWrapper>
                <ItemWrapper>
                    <span>Year</span>: {release_date}
                </ItemWrapper>
                <ItemWrapper>
                    <span>Rated</span>: {vote_average}
                </ItemWrapper>
                <ItemWrapper>
                    {genres &&
                        genres.map(genre => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}
                </ItemWrapper>

                <ItemWrapper>
                    <PlotItem>
                        <span>Plot</span>: {overview}
                    </PlotItem>
                </ItemWrapper>
            </InfoWrapper>
        </>
    );
};

MovieInformation.propTypes = {
    title: PropTypes.string,
    release_date: PropTypes.string,
    genres: PropTypes.array,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string
};

export default MovieInformation;
