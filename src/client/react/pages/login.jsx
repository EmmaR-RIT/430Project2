import React from 'react';
import { createRoot } from 'react-dom/client';

import { sendPost } from '../../utils';


// Error message display handling
const displayError = (message) => { document.getElementById('errorMessage').innerHTML = message; };
const hideError = () => { document.getElementById('errorMessage').innerHTML = ''; };


// Login form submission event handler
const handleLogin = (e) => {
    e.preventDefault();
    hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) displayError('Username or password is empty!');
    else sendPost(e.target.action, { username, pass }, displayError);

    return false;
};


// Signup form submission event handler
const handleSignup = (e) => {
    e.preventDefault();
    hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    console.log(pass, '   ', pass2)

    if (!username || !pass || !pass2) displayError('All fields are required!');
    else if (pass !== pass2) displayError('Passwords do not match!');
    else sendPost(e.target.action, { username, pass, pass2 }, displayError);

    return false;
};


// Login form React component
const LoginForm = () => {
    return (
        <form id='loginForm'
            name='loginForm'
            onSubmit={handleLogin}
            action='/login'
            method='POST'
            className='mainForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input type='password' name='pass' id='pass' placeholder='password' />
            <input type='submit' className='formSubmit' value='Sign in' />
        </form>
    );
};


// Signup form React component
const SignupForm = () => {
    return (
        <form id='signupForm'
            name='signupForm'
            onSubmit={handleSignup}
            action='/signup'
            method='POST'
            className='mainForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input type='password' name='pass' id='pass' placeholder='password' />
            <label htmlFor='pass2'>Password: </label>
            <input type='password' name='pass2' id='pass2' placeholder='retype password' />
            <input type='submit' className='formSubmit' value='Sign up' />
        </form>

    );
};


// Set up page on load
window.onload = () => {
    const root = createRoot(document.getElementById('content'));

    // Button to switch to login form
    document.getElementById('loginButton').onclick = (e) => {
        e.preventDefault();
        root.render(<LoginForm />);
        return false;
    };

    // Button to switch to signup form
    document.getElementById('signupButton').onclick = (e) => {
        e.preventDefault();
        root.render(<SignupForm />);
        return false;
    };

    root.render(<LoginForm />);
};
