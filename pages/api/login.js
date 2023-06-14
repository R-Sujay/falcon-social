import { account } from "../../appwrite";
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
    const body = JSON.parse(request.body);
    console.log(body.email);
    //Initiate the Appwrite client
    const sdk = require("node-appwrite");

    // Initiate the user client
    const userClient = new sdk.Client();
    userClient.setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.APPWRTIE_PROJECT_ID).setKey(process.env.APPWRITE_KEY); // Your secret API key
    const users = new sdk.Users(userClient);
    const authentication = account.createEmailSession(body.email, body.password);

    // Authenitcate the user using email and password
    authentication.then(
      async function (authResponse) {
        console.log(authResponse);
        const promise = users.get(authResponse.userId);
        await promise.then(
          function (userResponse) {
            console.log(userResponse);
            response.status(200).json({
              status: "Success",
              name: userResponse.name,
              userId: authResponse.userId,
              providerUid: authResponse.providerUid,
            });
          },
          function (error) {
            response.status(error.response.code).json({ status: error.response.message });
          }
        );
      },
      function (error) {
        response.status(error.response.code).json({ status: error.response.message });
      }
    );
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error occured. Try again later!" });
  }
}