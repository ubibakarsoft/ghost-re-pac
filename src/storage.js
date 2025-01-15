
// **Set up storage**- ./src/storage.js`

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
 