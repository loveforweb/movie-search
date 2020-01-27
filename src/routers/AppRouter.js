import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Listing from '../pages/Listing';
import Details from '../pages/Details';
import NotFound from '../pages/NotFound';
import Header from '../components/Header';
import ActorDetails from '../pages/ActorDetails';

const Main = styled.main`
    width: 100%;
`;

const Content = styled.div`
    max-width: 144rem;
    margin: 0 auto;
    padding: 0 2rem;
`;

const AppRouter = () => (
    <Main>
        <Header text="Movie Search" />
        <Content>
            <Router>
                <Switch>
                    <Route path="/" component={Listing} exact={true} />
                    <Route path="/details/:id" component={Details} />
                    <Route path="/actor/:id" component={ActorDetails} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Content>
    </Main>
);

export default AppRouter;
