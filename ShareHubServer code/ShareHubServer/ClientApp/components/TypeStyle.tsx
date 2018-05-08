//æøå
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

//this is a React component to display css writen in typescript
export class TypeStyle extends React.Component<
    {
        css: { identifier: string; style: React.CSSProperties }[];
    }> {
    public static CSSPropertiesToString(css: React.CSSProperties): string {
        let re: string = "";
        let keys: string[] = Object.keys(css);
        for (let j: number = 0; j < keys.length; j++) {
            let key = keys[j];
            for (let k: number = 0; k < key.length; k++) {
                if (key[k] == key[k].toUpperCase()) {
                    key = key.substring(0, k) + "-" + key[k].toLowerCase() + key.substring(k + 1, key.length)
                }
            }
            re += key + ": " + css[keys[j]] + ";";
        }
        return re;
    }
    constructor() {
        super();
    }
    public render() {
        return <style>
            {(() => {
                let re: string = "";
                re += "\n";
                for (let i: number = 0; i < this.props.css.length; i++) {
                    re += this.props.css[i].identifier + "{\n";
                    re += TypeStyle.CSSPropertiesToString(this.props.css[i].style);
                    re += "\n}";
                }
                re += "\n";
                return re;
            })()}
        </style>
    }
}
