import React from 'react';
import styled, { css } from 'styled-components';

const MessageWrapper = styled.div`
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
    console.log(props);
    return (
        <MessageWrapper status={props.status}>{props.message}</MessageWrapper>
    );
};

export default Message;
