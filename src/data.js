//Set up data and AppSync - ./src/data.js` 

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
