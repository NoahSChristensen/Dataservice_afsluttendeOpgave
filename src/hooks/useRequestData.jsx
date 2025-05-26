import { useState } from "react";
import axios from "axios"; // man kunne også bruge fetch() eller XHR

const useRequestData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // Kan både være en {} eller []
  const [error, setError] = useState(false);
  // request-metoder der er tilladt  
  const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];


  // funktion som "ringer" API'et op
  const makeRequest = async (url, method = "GET", body=null, params = {}, headers = {} ) => {
    
    // Oversæt den medsendte til store bogstaver, så den kan sammenlignes med de tilladte metoder
    const methodUpper = method.toUpperCase(); // Get = GET .... pOsT = POST

    try {

        // Tjek om request-metoden er en del af allowedMethods
        if (!allowedMethods.includes(methodUpper)) {
            throw new Error("Fejl - ukendt request HTTP-request metode - skal være GET POST PUT PATCH eller DELETE")
        };

        // Nulstiller states - starter på en frisk
        setLoading(true); // Der loades- afventes data
        setError(false);

        // Den tømmer data - er blevet sat på catch(err) i stedet for. Det stopper siden fra, at page jump
        // setData(null);

        // await new Promise(resolve => setTimeout(resolve, 5000));

        // response til at rumme data fra API
        let response

        // GET POST PUT PATCH DELETE
        const config = {
            method: methodUpper,
            url,
            params: params,
            headers: headers
        };

        if(["POST", "PUT", "PATCH"].includes(methodUpper) && body) {
            config.data = body // Tilføjer body til config, når POST, PUT eller PATCH bliver brugt
        } ;

        // Kald API'et
        response = await axios(config);
        // data fra API gemmes i state
        setData(response.data);       
        
    } catch (err) {

        setError(true);
        console.log(err);
        setData(null);
        throw err // nødvendig?
        
    } finally {
        setLoading(false);
    };

  };

  return { makeRequest, loading, data, error };
};

export default useRequestData;
