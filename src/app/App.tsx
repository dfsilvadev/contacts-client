import { ContactsContent } from "@/content";
import { Provider } from "react-redux";

import { store } from "./store";

function App() {
  return (
    <Provider {...{ store }}>
      <main className="min-h-screen bg-gray-950 text-gray-200">
        <ContactsContent />
      </main>
    </Provider>
  );
}

export default App;
