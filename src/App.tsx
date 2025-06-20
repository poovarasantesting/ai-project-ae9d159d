import RegistrationForm from "./components/RegistrationForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <RegistrationForm />
      <Toaster />
    </main>
  );
}

export default App;