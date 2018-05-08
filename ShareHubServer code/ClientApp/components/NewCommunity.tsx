//æøå
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Cookie } from '../utilities/cookie'
import { User } from "../utilities/user";
import { Http } from "../utilities/http";

//this React component is the to create a new community
export class NewCommunity extends React.Component<RouteComponentProps<{}>, {}> {
    name: HTMLInputElement | null = null;
    uniqueName: HTMLInputElement | null = null;
    constructor() {
        super();

    }
    public render() {
        if (User.current == null) {
            this.props.history.push("/Home");
        }
        return <div>
            <h2>New Community</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Name:
                    </td>
                        <td>
                            <input style={{ width: "300px" }} ref={(input) => this.name = input} type="text" placeholder="The name of the community" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Id:
                    </td>
                        <td>
                            <input style={{ width: "300px" }} ref={(input) => this.uniqueName = input} type="text" placeholder="An unique name for community" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => {
                                Http.post<NewResult>('api/CommunityGateway/New', {
                                    userKey: User.current!.key,
                                    communityId: this.uniqueName!.value,
                                    communityName: this.name!.value
                                }).then(data => {
                                    if (data.success && data.authorized) {
                                        alert("your community has been created");
                                        this.props.history.push("community/" + this.uniqueName!.value);
                                    }
                                })
                            }}>Create your new community</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
}
interface NewResult {
    type: string;
    authorized: boolean;
    message: string;
    success: boolean;
}