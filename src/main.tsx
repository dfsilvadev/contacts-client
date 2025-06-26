import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/app/App";

import "@/styles/App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-fmte58g61crqbny6.us.auth0.com"
      clientId="t91GMG3ZcifcwAcW5KqoUqBpQUA6iA4b"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="memory"
      useRefreshTokens={true}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
