// /components/sections/Contact.tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Contact() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="text-xl mb-8">
          Contact us today to book your rental or discuss your event needs.
        </p>
        <Button size="lg" variant="outline" asChild>
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </section>
  )
}
