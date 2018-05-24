import React from 'react';
import { Modal } from './SignUp';
import { logoutUser } from '../../actions';


class LogoutPage extends React.Component {
    // TODO logout on page load: needs a refresh at the moment
    componentDidMount() {
        logoutUser();
    }
    render() {
        return (
            <div className="uk-flex-center uk-position-center login-form" uk-grid>
                <Modal text='Logged out!' />
            </div >
        );
    }
}


export default LogoutPage;
