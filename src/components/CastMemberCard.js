import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FALLBACK_CAST from '../img/blank-profile-picture.png';
import { TMDB_IMAGE_URL } from '../setting/options';
import HoverOverlay from '../components/HoverOverlay';

const MemberCard = styled.div`
    width: 14rem;
    margin-right: 2rem;
`;

const MemberImage = styled.div`
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;

    img {
        display: block;
        width: 100%;
    }
`;
const MemberCredentials = styled.div``;
const Character = styled.p``;
const Actor = styled.p``;

const MemberLink = styled(Link)`
    display: block;
`;

const CastMemeberCard = ({ profile_path, name, character, id }) => {
    const [mouseOver, setMouseOver] = useState('false');

    const manageMouseOver = e => {
        setMouseOver('true');
    };

    const manageMouseOut = e => {
        setMouseOver('false');
    };

    return (
        <MemberCard>
            <MemberLink
                to={`/actor/${id}`}
                onMouseOver={manageMouseOver}
                onMouseOut={manageMouseOut}
            >
                <MemberImage>
                    {profile_path ? (
                        <img
                            src={`${TMDB_IMAGE_URL}/w276_and_h350_face${profile_path}`}
                            alt={`${name} profile`}
                        />
                    ) : (
                        <img src={`${FALLBACK_CAST}`} alt={`${name} profile`} />
                    )}
                    <HoverOverlay
                        prepend="Read about "
                        text={name}
                        mouseOver={mouseOver}
                    />
                </MemberImage>

                <MemberCredentials>
                    <Character>Character: {character}</Character>
                    <Actor>Actor: {name}</Actor>
                </MemberCredentials>
            </MemberLink>
        </MemberCard>
    );
};

CastMemeberCard.propType = {
    profile_path: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    character: PropTypes.string
};

export default CastMemeberCard;
