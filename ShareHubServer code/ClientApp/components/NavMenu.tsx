//æøå
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User } from '../utilities/user';

//this React component is the nav bar to the left, it is used to navigate the different components on the site
export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' style={{
                        height: "90px",
                    }} to={'/'}><img src="./sharehub.png" style={{
                        width: "100%"
                    }} /></Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={'/login'} exact activeClassName='active'>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'} activeClassName='active'>
                                Register
                            </NavLink>
                        </li>
                        {(() => {
                            if (User.current != null) {
                                return [<li key="1">
                                    <NavLink to={'/profile'} activeClassName='active'>
                                        Profile
                                    </NavLink>
                                </li>,
                                    <li key="2">
                                        <NavLink to={"/community"} activeClassName="active">
                                            Communities
                                        </NavLink>
                                    </li>
                                ]
                            }
                            return;
                        })()}
                    </ul>
                </div>
            </div>
        </div>;
    }
}