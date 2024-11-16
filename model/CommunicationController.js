// CommunicationController.js
// CommunicationController è una classe che si occupa di gestire le chiamate API al server.
class CommunicationController {
    
    static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425/"; // URL base per le chiamate API

   // static sid = "ANSZH9e3oKwItsqwINd44VyymsbfqhzzIUEtIVJ9txlbMZUcSdKHgKccNBnyimi8" ;


    static async genericRequest(endpoint, verb, queryParams , bodyParams ) {
        const queryParamsFormatted = new URLSearchParams(queryParams).toString();
        const url = this.BASE_URL + endpoint + "?" + queryParamsFormatted;
        //console.log("sending " + verb + " request to: " + url);
        let fatchData = {
            method: verb,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        if (verb != 'GET') {
            fatchData.body = JSON.stringify(bodyParams);
        }
        let httpResponse = await fetch(url, fatchData);

        const status = httpResponse.status;
        if (status == 200) {
            let deserializedObject = await httpResponse.json();
            //console.log("Response: " + JSON.stringify(deserializedObject));
            return deserializedObject;
        } else if (status === 204) {
            // Gestiamo la risposta 204 No Content
            console.log("Request succeeded, no content returned.");
            return {};
        } else {
            //console.log(httpResponse);
            const message = await httpResponse.text();
            let error = new Error("Error message from the server. HTTP status: " + status + " " + message);
            throw error;
        }
    }

    static async register() {
        let endpoint = "user/";
        let verb = 'POST';
        let queryParams = {};
        let bodyParams = {};
        try {
            console.log("Chiamata API per registrazione utente...");
            const response = await this.genericRequest(endpoint, verb, queryParams, bodyParams);

            if (response && response.sid) {
                console.log("Registrazione completata. SID ricevuto:", response.sid);
                return response.sid; // Restituiamo solo il SID
            } else {
                console.error("Errore: nessun SID trovato nella risposta.");
                return null;
            }
        } catch (error) {
            console.error("Errore nella funzione register:", error.message);
            return null;
        }
    }

 }


export default CommunicationController;