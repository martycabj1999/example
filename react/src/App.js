import React from 'react';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import store from './store.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './modules/layout/components/menuToolbar/MenuToolbar';
import Footer from './modules/layout/components/footer/Footer';
import { routesPublic, routesPrivate } from './RoutesApp';
import PrivateRoute from './PrivateRoute';
import './app.css';

function App() {

    const routeComponentsPublic = routesPublic
        .map(({ path, component }, key) =>
            <Route
                exact path={path}
                component={component}
                key={key} />);
    const routeComponentsPrivate = routesPrivate
        .map(({ path, component, roles }, key) =>
            <PrivateRoute
                component={component}
                path={path}
                roles={roles}
                key={key}>
            </PrivateRoute>
        )
    return (
        <Provider store={store}>
            <Router>
                <Menu />
                <Switch>
                    {routeComponentsPublic}
                    {routeComponentsPrivate}
                </Switch>
                <Footer />
            </Router>
        </Provider>
    );
}

export default App;
