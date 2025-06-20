import React from "react";
import { LoginForm } from "./components/LoginForm";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <main className="min-h-screen bg-background">
      <LoginForm />
      <Toaster />
    </main>
  );
}