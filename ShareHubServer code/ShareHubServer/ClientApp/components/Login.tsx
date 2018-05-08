//æøå
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Cookie } from '../utilities/cookie'
import { User } from "../utilities/user";

//this React component is for the user to login
export class Login extends React.Component<RouteComponentProps<{}>, {}> {
    username: HTMLInputElement | null = null;
    password: HTMLInputElement | null = null;
    constructor() {
        super();
    }
    public render() {
        return <div>
            <h2>login</h2>
            <span>username: </span><input ref={(input) => this.username = input} onKeyUp={e => this.loginSender(e)} type="text" /><br />
            <span>password: </span><input ref={(input) => this.password = input} onKeyUp={e => this.loginSender(e)} type="password" /><br />
            <input type="submit" onClick={() => this.submit()} /><br />
        </div>
    }
    private loginSender(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            this.submit();
        }
    }
    private submit() {
        if (this.username != null && this.password != null) {
            let username: HTMLInputElement = this.username as HTMLInputElement;
            let password: HTMLInputElement = this.password as HTMLInputElement;
            User.tryLogin(username.value, password.value, (user: User) => {
                this.props.history.push("/Home");
            }, (message: string) => {
                alert(message);
                password.value = "";
            });
        }
    }
}
