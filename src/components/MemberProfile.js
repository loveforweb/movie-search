import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TMDB_IMAGE_URL } from '../setting/options';

const BioTag = styled.p``;

const DetailList = styled.ul`
    list-style: none;
    margin: 0;
`;

const DetailItem = styled.li`
    margin: 0;
`;

const ImageWrapper = styled.div``;

const MemberProfile = ({ details }) => {
    const {
        profile_path,
        name,
        place_of_birth,
        gender,
        birthday,
        biography
    } = details;

    return (
        <div>
            <div className="row">
                <ImageWrapper>
                    <img
                        src={
                            profile_path
                                ? `${TMDB_IMAGE_URL}w300_and_h450_bestv2${profile_path}`
                                : 'https://via.placeholder.com/200x308&text=Profile+Image+Not+Available'
                        }
                        alt={name}
                    />
                </ImageWrapper>
                <DetailList>
                    <DetailItem>{name && `Name: ${name}`}</DetailItem>
                    <DetailItem>
                        {place_of_birth && `Place of birth: ${place_of_birth}`}
                    </DetailItem>
                    <DetailItem>
                        {gender && gender === 2
                            ? 'Gender: Male'
                            : 'Gender: Female'}
                    </DetailItem>
                    <DetailItem>{birthday && `DOB: ${birthday}`}</DetailItem>
                </DetailList>
            </div>
            <div className="row">
                <BioTag>{biography && `Bio: ${biography}`}</BioTag>
            </div>
        </div>
    );
};

MemberProfile.propTypes = {
    details: PropTypes.shape({
        profile_path: PropTypes.string,
        name: PropTypes.string.isRequired,
        place_of_birth: PropTypes.string,
        gender: PropTypes.number,
        birthday: PropTypes.string,
        biography: PropTypes.string
    })
};

export default MemberProfile;
