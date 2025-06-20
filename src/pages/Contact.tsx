import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Get in Touch</h1>
        <p className="mt-2 text-muted-foreground">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}