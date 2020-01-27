import React from 'react';
import PropTypes from 'prop-types';
import { TMDB_IMAGE_URL } from '../setting/options';

const MemberProfile = ({ details }) => {
    console.log(details);
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
            <img
                src={`${TMDB_IMAGE_URL}w300_and_h450_bestv2${profile_path}`}
                alt={name}
            />
            Name: {name}
            Place of birth: {place_of_birth}
            Gender: {gender === 2 ? 'Male' : 'Female'}
            DOB: {birthday}
            Bio: {biography})
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
