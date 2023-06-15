import { Client, Account, ID } from "appwrite";
const sdk = require("node-appwrite");
/**
 * Method to handle the login
 *
 * @param {HttpRequest}   request  The HTTP request.
 * @param {HttpResponse}   response The HTTP response
 *
 * @return {HttpResponse} Return the response with the authentication status
 */

export default async function handler(request, response) {
  try {
    //Get the request parameters
    const body = JSON.parse(JSON.stringify(request.body));
    //Initiate the Appwrite client
    const client = new Client().setEndpoint(process.env.APPWRTIE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    const account = new Account(client);

    //Initiate the user client
    const userClient = new sdk.Client();
    userClient.setEndpoint(process.env.APPWRTIE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID).setKey(process.env.APPWRITE_KEY); // Your secret API key
    const users = new sdk.Users(userClient);
    const authentication = account.createEmailSession(body.email, body.password);
    //Authenitcate the user using email and password
    await authentication.then(
      async function (authResponse) {
        const promise = users.get(authResponse.userId);
        await promise.then(
          function (userResponse) {
            response.status(200).json({
              status: "Success",
              name: userResponse.name,
              userId: authResponse.userId,
              providerUid: authResponse.providerUid,
            });
          },
          function (error) {
            response.status(error.response.code).json({ status: error.response.message, error: true });
          }
        );
      },
      function (error) {
        response.status(error.response.code).json({ status: error.response.message, error: true });
      }
    );
  } catch (error) {
    response.status(500).json({ message: "Error occured. Try again later!" });
  }
}
