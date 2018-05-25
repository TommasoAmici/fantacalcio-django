import React from 'react';
import { Modal } from './SignUp';


class LogoutPage extends React.Component {
    render() {
        return (
            <div className="uk-flex-center uk-position-center login-form" uk-grid>
                <Modal text='Logged out!' />
            </div >
        );
    }
}


export default LogoutPage;
