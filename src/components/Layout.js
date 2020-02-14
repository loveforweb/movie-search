import Header from './Header';

const Layout = props => {
    return (
        <main>
            <Header text="Movie Search" />
            <div className="content">{props.children}</div>
        </main>
    );
};

export default Layout;
