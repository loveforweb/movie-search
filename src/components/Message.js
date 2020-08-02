import PropTypes from 'prop-types';

const Message = ({ status, message }) => {
    return (
        <>
            <div className="message-wrapper" status={status}>
                {message}
            </div>
            <style jsx>{`
                .message-wrapper {
                    border-width: 2px;
                    border-style: solid;
                    border-color: ${status == 'error' ? 'red' : 'black'};
                    padding: 1.2rem;
                    display: flex;
                    justify-content: center;
                    font-size: 1.8rem;
                    color: ${status == 'error' ? 'red' : 'black'};
                }
            `}</style>
        </>
    );
};

Message.propTypes = {
    status: PropTypes.string,
    message: PropTypes.string.isRequired
};

export default Message;
