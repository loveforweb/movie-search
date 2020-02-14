import Link from 'next/link';
import PropTypes from 'prop-types';

const Header = ({ text }) => {
    return (
        <>
            <header className="header">
                <h1>
                    <Link href="/">
                        <a>{text}</a>
                    </Link>
                </h1>
            </header>

            <style jsx>{`
                .header {
                    background-color: #282c34;
                    height: 7rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    padding: 2rem;
                    margin-bottom: 4rem;
                }

                h1 a {
                    font-size: 2.4rem;
                    color: white;
                    text-decoration: none;
                }

                h1 a:hover,
                h1 a:focus {
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
};

Header.propTypes = {
    text: PropTypes.string.isRequired
};

export default Header;
