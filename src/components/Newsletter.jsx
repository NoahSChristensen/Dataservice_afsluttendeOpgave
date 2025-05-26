import React from "react";

const Newsletter = () => {
  return (
    <div>
        <h2>Tilmeld dig vores nyhedsbrev!</h2>
      <form>
        <label>
          Indtast email:
          <input type="text" placeholder="Din email her..." />
        </label>
      </form>
    </div>
  );
};

export default Newsletter;
