import { ID, account } from "../../appwrite";

/**
 * Method to handle the user registeration
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

    //Initiate the Appwrite client
    const promise = account.create(ID.unique(), body.email, body.password, body.username);
    //Register the user
    await promise.then(
      function (registerResponse) {
        response.status(200).json({ status: "Success", providerUid: registerResponse.providerUid });
      },
      function (error) {
        //Error handling
        console.log(error);
        response.status(error.response.code).json({ status: error.response.message });
      }
    );
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error occured. Try again later!" });
  }
}
