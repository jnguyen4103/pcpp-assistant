import React from 'react';
import axios from 'axios';
import RegisterPageView from './RegisterPageView';

const RegisterPage = () => {

    const handleClick = () => {
        console.log('Clicked a button');
    };

    return <RegisterPageView handleClick={handleClick} />;
};

export default RegisterPage;