import { Route, Routes } from "react-router-dom";
import AuthGuard from "./private";

import { ContactsPage, LoginPage } from "@/pages";

const DefaultRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <ContactsPage />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default DefaultRoutes;
