//æøå
import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
import { User } from "./utilities/user"
let routes = RoutesModule.routes;
import { Http } from "./utilities/http";

const hotModuleReplacement = false;

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    document.title = "ShareHub";
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={ routes } basename={ baseUrl } />
        </AppContainer>,
        document.getElementById('react-app')
    );
}
//Checks wether or not the user is loged in
User.check(false, (user: User | null) => {
    renderApp();

    // Allow Hot Module Replacement
    if (module.hot && hotModuleReplacement) {
        module.hot.accept('./routes', () => {
            routes = require<typeof RoutesModule>('./routes').routes;
            renderApp();
        });
    }

})