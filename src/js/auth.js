import { Amplify, Auth } from 'aws-amplify';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import amplifyConfig from './amplify-config';

Amplify.configure(amplifyConfig);

let auth0Client;

async function initializeAuth0() {
  auth0Client = await createAuth0Client({
    domain: 'YOUR_AUTH0_DOMAIN',
    client_id: 'YOUR_AUTH0_CLIENT_ID',
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

   import { Amplify } from 'aws-amplify';

   Amplify.configure({
     Auth: {
       region: 'YOUR_REGION',
       userPoolId: 'YOUR_USER_POOL_ID',
       userPoolWebClientId: 'YOUR_USER_POOL_WEB_CLIENT_ID'
     },
     API: {
       graphql_endpoint: 'YOUR_APPSYNC_ENDPOINT',
       graphql_headers: async () => ({
         'x-api-key': 'YOUR_APPSYNC_API_KEY'
       })
     },
     Storage: {
       AWSS3: {
         bucket: 'XXXXXXXXXXXXXXXXXXX',
         region: 'YOUR_REGION'
       }
     }
   });
 

//4. **Set up authentication** - Create an `auth.js` file in your `src` directory - Add the following code:

// ```javascript
   import { Auth } from 'aws-amplify';

   export async function signUp(username, password, email) {
     try {
       const { user } = await Auth.signUp({
         username,
         password,
         attributes: { email }
       });
       console.log(user);
     } catch (error) {
       console.log('Error signing up:', error);
     }
   }

   export async function signIn(username, password) {
     try {
       const user = await Auth.signIn(username, password);
       console.log(user);
     } catch (error) {
       console.log('Error signing in:', error);
     }
   }


//5. **Set up data and AppSync** - Create a `data.js` file in your `src` directory - Add the following code:

//```javascript

   import { API, graphqlOperation } from 'aws-amplify';

   const listItems = /* GraphQL */ `
     query ListItems {
       listItems {
         items {
           id
           name
         }
       }
     }
   `;

   export async function fetchItems() {
     try {
       const response = await API.graphql(graphqlOperation(listItems));
       return response.data.listItems.items;
     } catch (error) {
       console.log('Error fetching items:', error);
     }
   }

//6. **Set up storage**- Create a `storage.js` file in your `src` directory- Add the following code:

//```javascript
   import { Storage } from 'aws-amplify';

   export async function uploadFile(file) {
     try {
       const result = await Storage.put(file.name, file, {
         contentType: file.type
       });
       console.log('File uploaded successfully:', result);
     } catch (error) {
       console.log('Error uploading file:', error);
     }
   }
 

//**Integrate Amplify features in your main application**- In your `main.js` file, import and use the Amplify features:

//javascript
   import './amplify-config';
   import { signUp, signIn } from './auth';
   import { fetchItems } from './data';
   import { uploadFile } from './storage';

   // Example usage
   document.addEventListener('DOMContentLoaded', async () => {
     // Authentication
     await signUp('username', 'password', 'email@example.com');
     await signIn('username', 'password');

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
   