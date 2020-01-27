import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const MessageWrapper = styled.div`
    color: black;
    ${props =>
        props.status === 'error' &&
        css`
            color: red;
        `}

    ${props =>
        props.status === 'no-results' &&
        css`
            color: green;
        `}
`;

const Message = props => {
    const { status, message } = props;
    return <MessageWrapper status={status}>{message}</MessageWrapper>;
};

Message.propTypes = {
    status: PropTypes.string,
    message: PropTypes.string.isRequired
};

export default Message;
