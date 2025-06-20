import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ChatPage from "@/pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;