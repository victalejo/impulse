// app/contact/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mail, Send, Sparkles, Phone } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formState)
    alert("Thank you for contacting us! We'll get back to you soon.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative bg-[#060404] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Animated bubbles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#ff0054]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              background: `linear-gradient(45deg, rgba(255,0,84,0.05), rgba(251,228,11,0.05))`
            }}
          />
        ))}
        
        {/* Light effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
      </div>

      <div className="max-w-2xl w-full mx-auto px-4">
        {/* Form Card */}
        <Card className="bg-gradient-to-br from-[#060404]/80 to-[#060404]/95 backdrop-blur-sm 
                      border-2 border-[#fbe40b]/20 hover:border-[#fbe40b]/50 
                      transition-all duration-500 shadow-2xl 
                      hover:shadow-[0_0_30px_rgba(251,228,11,0.3)]
                      overflow-hidden relative">
          {/* Corner glow effects */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#ff0054] to-transparent opacity-50 blur-md rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#fbe40b] to-transparent opacity-50 blur-md rounded-tl-full"></div>
          
          <CardHeader className="border-b border-[#ff0054]/20 pb-6">
            <div className="flex flex-col items-center text-center mb-2">
              <CardTitle className="text-5xl font-bebas mb-2 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text flex items-center gap-2">
                <Sparkles className="text-[#fbe40b] h-8 w-8" />
                CONTACT US
                <Sparkles className="text-[#ff0054] h-8 w-8" />
              </CardTitle>
              <CardDescription className="text-[#fefefe]/60 text-lg max-w-xl">
                Complete the form and we'll get back to you soon to discuss your needs.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="pt-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#fefefe] font-bebas text-lg" htmlFor="firstName">
                    FIRST NAME
                  </Label>
                  <div className="relative">
                    <Input 
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] 
                               focus:border-[#ff0054] hover:border-[#ff0054]/50 
                               transition-colors duration-200 pl-10"
                      placeholder="Your first name"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="w-4 h-4 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[#fefefe] font-bebas text-lg" htmlFor="lastName">
                    LAST NAME
                  </Label>
                  <div className="relative">
                    <Input 
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] 
                               focus:border-[#ff0054] hover:border-[#ff0054]/50 
                               transition-colors duration-200 pl-10"
                      placeholder="Your last name"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="w-4 h-4 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#fefefe] font-bebas text-lg" htmlFor="email">
                  EMAIL
                </Label>
                <div className="relative">
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] 
                             focus:border-[#ff0054] hover:border-[#ff0054]/50 
                             transition-colors duration-200 pl-10"
                    placeholder="your@email.com"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#ff0054]" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#fefefe] font-bebas text-lg" htmlFor="phone">
                  PHONE
                </Label>
                <div className="relative">
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] 
                             focus:border-[#ff0054] hover:border-[#ff0054]/50 
                             transition-colors duration-200 pl-10"
                    placeholder="Your phone number"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-[#ff0054]" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#fefefe] font-bebas text-lg" htmlFor="service">
                  SERVICE YOU WANT
                </Label>
                <div className="relative">
                  <Input 
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] 
                             focus:border-[#ff0054] hover:border-[#ff0054]/50 
                             transition-colors duration-200 pl-10"
                    placeholder="Write the service you're interested in"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Sparkles className="h-4 w-4 text-[#ff0054]" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#fefefe] font-bebas text-lg" htmlFor="message">
                  MESSAGE
                </Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] 
                           focus:border-[#ff0054] hover:border-[#ff0054]/50 
                           transition-colors duration-200 min-h-[120px]"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <div>
                <Button 
                  type="submit"
                  className="w-full relative overflow-hidden group
                           bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                           text-[#060404] font-bebas text-xl px-8 py-6
                           transform hover:scale-105 transition-all duration-300
                           shadow-lg hover:shadow-[#ff0054]/50 border-none"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700"></span>
                  SEND MESSAGE
                  <Send className="w-5 h-5 ml-2 inline-block" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
      `}</style>
    </div>
  )
}