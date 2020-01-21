import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import genres from '../data/genres';

const MovieWrapper = styled.div`
    padding: 0;
    width: 48%;
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    border: 0.1rem solid black;

    // @media screen and (min-width: 694px) and (max-width: 915px) {
    //     max-width: 33%;
    // }

    // @media screen and (min-width: 652px) and (max-width: 693px) {
    //     max-width: 50%;
    // }

    // @media screen and (max-width: 651px) {
    //     max-width: 100%;
    //     margin: auto;
    // }
`;

const Heading = styled.h2`
    font-size: 2.4rem;
`;

const ImageWrapper = styled.div`
    img {
        display: block;
    }
`;

const InfoWrapper = styled.div`
    padding: 1rem;
`;

const InfoList = styled.ul`
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    list-style: none;
`;
const InfoListItem = styled.li`
    position: relative;
    padding: 0 1rem;

    &:after {
        content: '';
        position: absolute;
        right: 0;
        height: 10px;
        width: 1px;
        background-color: black;
        top: 0;
    }

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        padding-right: 0;

        &:after {
            display: none;
        }
    }
`;

const DEFAULT_PLACEHOLDER_IMAGE =
    'https://via.placeholder.com/300x445?text=No+poster+available';

const MovieCard = ({ movie }) => {
    const { id, title, release_date, poster_path, overview, genre_ids } = movie;
    const poster =
        poster_path === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : poster_path;
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        getGenre();
        return () => {
            console.log('clean up');
        };
    }, []);

    const getGenre = () => {
        const matchedGenres = genre_ids
            .map(movieGenreId => {
                return genres.filter(genre => {
                    return genre.id === movieGenreId;
                });
            })
            .reduce((a, b) => a.concat(b), []);

        setGenre(matchedGenres);
    };

    return (
        <MovieWrapper>
            <ImageWrapper>
                <img
                    alt={`The movie titled: ${title}`}
                    src={`https://image.tmdb.org/t/p/w200/${poster}`}
                />
            </ImageWrapper>
            <InfoWrapper>
                <Heading>
                    {title}{' '}
                    <span>({format(parseISO(`${release_date}`), 'yyyy')})</span>
                </Heading>
                <p>{overview}</p>
                <InfoList>
                    {genre.map(item => (
                        <InfoListItem key={`${id}-${item.id}`}>
                            {item.name}
                        </InfoListItem>
                    ))}
                </InfoList>
                <Link to={`/details/${id}`}>View more details</Link>
            </InfoWrapper>
        </MovieWrapper>
    );
};

export default MovieCard;
