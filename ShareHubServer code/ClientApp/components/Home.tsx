//æøå
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { TypeStyle } from "./TypeStyle";

//the React component is just the home of the site, nothing happens here
export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>ShareHub</h1>
            
        </div>;
    }
}
