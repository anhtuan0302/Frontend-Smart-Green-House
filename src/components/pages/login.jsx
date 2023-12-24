import React from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet";

import { Form, Input, Button, Checkbox } from 'antd';

const Login = () => {

    const pageBody = (
        <div>
            <h1>Login</h1>
            <p>Please sign in to continue</p>
        </div>
    );

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Layout body={pageBody} />
        </div>
    );
}

export default Login;