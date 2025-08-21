import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.css"; // Tailwind
import App from "./App";

// 👉 Khởi tạo Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // hoặc URL backend thật
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
