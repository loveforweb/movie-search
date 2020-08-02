import PropTypes from 'prop-types';

const HoverOverlay = ({ prepend, text, mouseOver }) => {
    return (
        <>
            <div className="hover-card">
                <span>
                    {prepend && prepend}
                    <strong>{text}</strong>
                </span>
            </div>

            <style jsx>{`
                .hover-card {
                    position: absolute;
                    height: 100%;
                    top: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 0.5rem;
                    text-align: center;
                    color: white;
                    opacity: ${mouseOver == 'true' ? '1' : '0'};
                    transition: opacity 0.25s ease-in-out;
                }

                .hover-card:before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transition: background-color 0.25s ease-in-out;
                    background-color: ${mouseOver == 'true'
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(0, 0, 0, 0)'};
                }

                span {
                    position: relative;
                    z-index: 1;
                }
            `}</style>
        </>
    );
};

HoverOverlay.propTypes = {
    text: PropTypes.string.isRequired,
    prepend: PropTypes.string,
    mouseOver: PropTypes.string.isRequired
};

export default HoverOverlay;
