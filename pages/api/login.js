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
    //Initiate the Appwrite client
    const authentication = account.createEmailSession(body.email, body.password);
    //Authenitcate the user using email and password
    authentication
      .catch((err) => response.status(err.response.code).json({ status: err.response.message }))
      .then(function (authResponse) {
        console.log(authResponse);
        response.status(200).json({ status: "Success", providerUid: authResponse.providerUid });
      });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error occured. Try again later!" });
  }
}
