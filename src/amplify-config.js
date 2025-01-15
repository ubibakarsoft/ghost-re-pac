import { Amplify } from 'aws-amplify';


   Amplify.configure({
     Auth: {
       region: 'ap-southeast-1',
       identityPoolId: 'ap-southeast-1:7cb48d3a-e0b7-4c33-bc4c-c5433c286d03',
    oauth: {
      domain: 'ubibakar.au.auth0.com',
      scope: ['openid', 'email', 'profile'],
      redirectSignIn: 'http://localhost:5173/',
      redirectSignOut: 'http://localhost:5173/',
      responseType: 'code'
    }
     },
     API: {
       graphql_endpoint: '',
       graphql_headers: async () => ({
         'x-api-key': ''
       })
     },
     Storage: {
       AWSS3: {
         bucket: '',
         region: ''
       }
     }
   });
 
