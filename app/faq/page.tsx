// app/faq/page.tsx
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="min-h-screen relative py-24">
      {/* Fondo con gradiente y efectos */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff0054]/20 to-[#fbe40b]/20">
        {/* Efectos de luz */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-1000 opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pontoon FAQ Section */}
        <div className="mb-24">
          <h1 className="text-center text-7xl md:text-8xl font-bebas mb-16">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Pontoon FAQ
            </span>
          </h1>

          <Card className="bg-[#060404]/95 backdrop-blur-sm border-[#ff0054]/20 p-8 space-y-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">What are the payment options?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                We accept Zelle, Cash App, Venmo or Cash.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">How many passengers can I bring on my Pontoon experience?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                You can only bring up to 11 passengers onboard. New Borns/Toddlers count as a passenger.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Are there Life Jackets on the Pontoon?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                Yes! 12 life jackets are conveniently located under the seats. We also include several youth life jackets. If you have any specific request do not hesitate to contact us immediately to see if we can accommodate.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Do I have to pay for gas?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                No! Never! Our rental prices include gas fees giving you peace of mind and one less thing to worry about.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Does the Pontoon include a grill?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                Yes! We also include propane in our all inclusive pricing. Bring your food and grilling skills onboard. Please practice caution around the grill so no one gets burned. Impulse Rentals is not responsible for inappropriate or careless use of equipment.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Does the Pontoon have a radio & speakers?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                Yes! The Pontoon comes with a Bluetooth radio that can easily be connected to so you can enjoy your tunes while on the lake.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Is gratuity suggested for our captain?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                We guarantee an amazing time and exceptional service! If you think so too, gratuities for your captain are always welcomed once your reservation is complete :)
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Do you offer referral incentives?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                We offer a special reward for referrals! Have a friend or family member who wants to ride the waves? Fantastic! Refer them to Impulse Rentals and receive $25 off your next booking with us, after the completion of the booking; 4 hour minimum.
              </p>
            </div>
          </Card>
        </div>

        {/* Foam Party FAQ Section */}
        <div className="mb-24">
          <h1 className="text-center text-7xl md:text-8xl font-bebas mb-16">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Foam Party FAQ
            </span>
          </h1>

          <Card className="bg-[#060404]/95 backdrop-blur-sm border-[#ff0054]/20 p-8 space-y-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">What are the payment options?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                We accept Zelle, Cash App, Venmo or Cash.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">What is a Foam Party?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                It's whatever you want it to be! It can be as simple as filling an area with foam and letting kids jump around and play in it or as involved as creating a dance club vibe with lights, music, and, of course, foam! All you need is foam and people looking to have fun!
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Is the Foam Slippery?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                Foam is about as slippery as water, so it's possible to slip if you're on long grass or a smooth, glossy surface such as tile. To prevent slipping, some guests like to wear water shoes. We also recommend guests avoid running in foamy areas.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">Is your Foam safe?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                Yes! Our standard foam solution is biodegradable, non-toxic, non-staining, and hypoallergenic. It is entirely safe for kids, adults, pets (yes, dogs love foam, too!), and even plants! While kids will be OK playing in the bubbles, we have found that some of them like to wear goggles.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">What do you need from me?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                We require a $100 deposit to secure the time frame and book your event. Once the event is booked and we show up on site, we will need power (2 outlets), water (1 hose bib per cannon), an area free of clutter to get setup (We don't want people tripping on stuff in the foam!), and people (or animals) ready to have fun!
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">How hard is it to clean up?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                It's really NOT! While our foam solution and water will evaporate on its own, we do like to hose down the area before we leave.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">How long does the Foam last?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                When left alone, foam can last several hours. However, once guests interact with it, the bubbles start to pop and break up. The more people play in the foam, the quicker it will dissolve. Don't worry though, we are there to replace it as needed!
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bebas text-[#ff0054]">How much space does a FOAM PARTY require?</h3>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                That is really up to you. We require an area of about 6 x 6 to setup the foam cannon. While we generally suggest about a 20 foot x 20 foot area, we can make the 'foam pit' as large or small as you would like!
              </p>
            </div>
          </Card>
        </div>

        {/* Botón Book Now */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                     text-[#fefefe] font-bebas text-3xl px-16 py-8 
                     transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-[#ff0054]/50"
            asChild
          >
            <Link href="/book-now">Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}