import React from 'react';
import styled from 'styled-components';
import FALLBACK_CAST from '../img/blank-profile-picture.png';

const MemberCard = styled.div`
    width: 140px;
    margin-right: 20px;
`;

const MemberImage = styled.div`
    img {
        width: 100%;
    }
`;
const MemberCredentials = styled.div``;
const Character = styled.p``;
const Actor = styled.p``;

const CastMemeberCard = ({ member }) => {
    console.log(member);
    const { profile_path, name, character } = member;
    return (
        <MemberCard>
            <MemberImage>
                {profile_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w276_and_h350_face${profile_path}`}
                        alt={`${name} profile`}
                    />
                ) : (
                    <img src={`${FALLBACK_CAST}`} alt={`${name} profile`} />
                )}
            </MemberImage>
            <MemberCredentials>
                <Character>Character: {character}</Character>
                <Actor>Actor: {name}</Actor>
            </MemberCredentials>
        </MemberCard>
    );
};

export default CastMemeberCard;
