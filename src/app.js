
import './amplify-config';
import { fetchItems } from './data';
import { uploadFile } from './storage';

import { Amplify, Auth } from 'aws-amplify';
import { createAuth0Client } from '@auth0/auth0-spa-js';


let auth0Client;

async function initializeAuth0() {
  auth0Client = await createAuth0Client({
    domain: 'ubibakar.au.auth0.com',
    client_id: 'K5mUjd3O8lrcA4ze2ChMkr6u2nj4aw4v',
    redirect_uri: window.location.origin
  });

  // Check if the user is returning from Auth0 login
  if (location.search.includes("code=") && location.search.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }
}

async function login() {
  await auth0Client.loginWithRedirect();
}

async function logout() {
  await auth0Client.logout({
    returnTo: window.location.origin
  });
}

async function getUser() {
  const user = await auth0Client.getUser();
  console.log('User:', user);
}

// Initialize Auth0
initializeAuth0();

// Add event listeners to your login/logout buttons
document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('getUserButton').addEventListener('click', getUser);

///

   document.addEventListener('DOMContentLoaded', async () => {

     // Data
     const items = await fetchItems();
     console.log('Items:', items);

     // Storage
     const fileInput = document.getElementById('fileInput');
     fileInput.addEventListener('change', (event) => {
       const file = event.target.files[0];
       uploadFile(file);
     });
   });
   