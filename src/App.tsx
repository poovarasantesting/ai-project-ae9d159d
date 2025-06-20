import React from "react"
import RegistrationForm from "./components/RegistrationForm"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <RegistrationForm />
      <Toaster />
    </div>
  )
}

export default App