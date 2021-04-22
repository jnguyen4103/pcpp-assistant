import React from 'react';
import axios from 'axios';
import RegisterPageView from './RegisterPageView';
import * as FormData from "form-data";

const RegisterPage = () => {
    const config = { headers: { Authorization: 'Bearer ${token}' } };

    const handleClick = () => {
        console.log('Clicked a button');
        var username = document.getElementById('createUsername').value;
        var email = document.getElementById('email').value;
        var first = document.getElementById('firstName').value;
        var last = document.getElementById('lastName').value;
        var pass = document.getElementById('createPassword').value;
        var pass2 = document.getElementById('confirmPassword').value;
        console.log(username);
        console.log(email);
        console.log(first);
        console.log(last);
        console.log(pass);

        let response = axios
            .post('http://127.0.0.1:8000/auth/register/', {
                email: email,
                username: username,
                password: pass,
                password2: pass2,
                first_name: first,
                last_name: last,
            })
            .then(console.log)
            .catch(console.log);

        // var axios = require('axios');
        // var FormData = require('form-data');
        // var data = new FormData();
        // data.append('email', email);
        // data.append('username', username);
        // data.append('password', pass);
        // data.append('password2', pass2);
        // data.append('first_name', first);
        // data.append('last_name', last);

        // var config = {
        //     method: 'post',
        //     url: 'http://127.0.0.1:8000/auth/register/',
        //     headers: {
        //         ...data.getHeaders(),
        //     },
        //     data: data,
        // };

        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    };

    return <RegisterPageView handleClick={handleClick} />;
};

export default RegisterPage;
