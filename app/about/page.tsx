// app/about/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { 
  Users, 
  Heart, 
  Trophy, 
  Target, 
  MousePointerClick  
} from "lucide-react"

// Define team member structure
interface TeamMember {
  id: number
  name: string
  bio: string
  imageUrl?: string
  useIcon?: boolean
}

// Team members data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Adalberto Marte",
    bio: "With over 10 years of experience in entertainment and events, Adalberto founded Impulse Rentals with the vision of creating unforgettable experiences for everyone.",
    imageUrl: "/images/about1.png"
  },
  {
    id: 2,
    name: "Valentina Holguin",
    bio: "Valentina is our boat expert, with nautical safety certification and unparalleled knowledge of our pontoons.",
    useIcon: true
  },
  {
    id: 3,
    name: "Miguel Molina",
    bio: "Miguel's creativity has taken our foam parties to another level, creating unique environments for every occasion.",
    imageUrl: "/images/about2.png"
  }
]

// Company values
const companyValues = [
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do and put our heart into every experience we create."
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "We strive to exceed expectations in every aspect of our service."
  },
  {
    icon: Users,
    title: "Community",
    description: "We build lasting relationships with our customers, suppliers, and collaborators."
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We constantly look for new ways to improve and offer unique experiences."
  }
]

export default function AboutPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <div className="relative min-h-screen bg-[#060404] pt-32 pb-24 overflow-hidden">
      {/* Background with static gradients */}
      <div className="absolute inset-0 z-0">
        {/* Light effects */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[180px] opacity-10"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-7xl md:text-9xl font-bebas mb-8 relative inline-block">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              WHO WE ARE
            </span>
            {/* Title decoration */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-[#ff0054] to-[#fbe40b] rounded-full opacity-20"></div>
            <div className="absolute -left-16 -bottom-8 w-24 h-24 bg-gradient-to-br from-[#fbe40b] to-[#ff0054] rounded-full opacity-20"></div>
          </h1>

          <div className="max-w-4xl mx-auto relative">
            {/* Decorative lines */}
            <div className="absolute left-0 top-0 w-16 h-1 bg-gradient-to-r from-[#ff0054] to-transparent"></div>
            <div className="absolute right-0 top-0 w-16 h-1 bg-gradient-to-l from-[#ff0054] to-transparent"></div>
            
            <p className="text-xl md:text-2xl text-[#fefefe]/80 leading-relaxed mb-8">
              Welcome to Impulse Rentals, your premier destination for all your outdoor entertainment needs! We are thrilled to offer an unbeatable combination of boat and bounce house rentals, ensuring that your next event or outing is filled with excitement and unforgettable memories.
            </p>
            
            <p className="text-xl md:text-2xl text-[#fefefe]/80 leading-relaxed">
              What truly sets us apart from the competition is our passion for creating memorable experiences. Every moment is an opportunity for adventure and celebration. Whether planning a family outing, a corporate team-building event, or a community gathering, our boat and bounce house rentals will take your experience to the next level. Our goal is to exceed your expectations and leave you with memories that will be cherished for years.
            </p>
            
            {/* Decorative lines */}
            <div className="absolute left-0 bottom-0 w-16 h-1 bg-gradient-to-r from-[#ff0054] to-transparent"></div>
            <div className="absolute right-0 bottom-0 w-16 h-1 bg-gradient-to-l from-[#ff0054] to-transparent"></div>
          </div>
        </div>

        {/* Team section */}
        <div className="mb-16">
          <h2 className="text-5xl font-bebas text-center mb-16 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            OUR TEAM
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="relative group perspective"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className={`
                  transition-all duration-500 transform 
                  ${hoveredMember === member.id ? 'rotate-y-180' : 'rotate-y-0'}
                  relative h-[450px] w-full rounded-2xl shadow-xl 
                  preserve-3d
                `}>
                  {/* Card front */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#060404] border-2 border-[#ff0054]/20 hover:border-[#ff0054] transition-colors duration-300">
                      {/* Background effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#ff0054]/10 to-[#fbe40b]/10 opacity-50"></div>
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        {/* Profile Image or Icon */}
                        {member.useIcon ? (
                          <div className="relative w-52 h-52 rounded-full 
                                      bg-gradient-to-br from-[#ff0054] to-[#fbe40b] 
                                      flex items-center justify-center mb-8
                                      shadow-lg shadow-[#ff0054]/30 group-hover:shadow-[#ff0054]/50 
                                      transition-all duration-300 transform group-hover:scale-110"
                          >
                            <Users className="w-28 h-28 text-[#060404]" />
                            
                            {/* Shine effect */}
                            <div className="absolute inset-0 rounded-full 
                                          bg-gradient-to-r from-transparent via-[#fefefe]/20 to-transparent 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          </div>
                        ) : (
                          <div className="relative w-[260px] h-[260px] rounded-xl overflow-hidden 
                                       shadow-lg shadow-[#ff0054]/30 group-hover:shadow-[#ff0054]/50 
                                       transition-all duration-300 transform group-hover:scale-105 mb-8
                                       border-2 border-[#ff0054]/30">
                            <Image
                              src={member.imageUrl || ""}
                              alt={member.name}
                              fill
                              className="object-cover object-center"
                              style={{ objectPosition: 'center top' }}
                            />
                            {/* Shine effect */}
                            <div className="absolute inset-0 
                                          bg-gradient-to-r from-transparent via-[#fefefe]/20 to-transparent 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          </div>
                        )}
                        
                        <h3 className="text-3xl font-bebas text-[#fefefe] mb-2 group-hover:text-[#fbe40b] transition-colors duration-300">{member.name}</h3>
                        
                        {/* Flip text */}
                        <p className="text-[#fefefe]/70 text-sm mt-4">
                          (Click to see bio)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card back (Bio) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="relative h-full w-full rounded-2xl bg-[#060404] border-2 border-[#fbe40b]/20 hover:border-[#fbe40b] transition-colors duration-300 p-6 
                                  flex flex-col items-center justify-center text-center"
                    >
                      {/* Diagonal background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff0054]/10 to-[#fbe40b]/10 opacity-50"></div>
                      
                      <div className="relative space-y-6">
                        <h3 className="text-3xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">{member.name}</h3>
                        <p className="text-[#fefefe]/90 text-lg leading-relaxed">{member.bio}</p>
                        
                        <div className="w-16 h-1 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values section */}
        <div className="mb-20">
          <h2 className="text-5xl font-bebas text-center mb-16 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            OUR VALUES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {companyValues.map((value, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] rounded-2xl transform transition-all duration-500 group-hover:scale-[1.02] z-0"></div>
                <div className="relative bg-[#060404] m-[2px] rounded-2xl p-8 z-10 transition-transform duration-500 group-hover:translate-y-1 group-hover:translate-x-1">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-[#ff0054] to-[#fbe40b] flex items-center justify-center shadow-lg shadow-[#ff0054]/30 group-hover:shadow-[#ff0054]/50 transition-all duration-300">
                      <value.icon className="w-12 h-12 text-[#060404]" />
                    </div>
                    
                    <div className="text-center md:text-left space-y-4">
                      <h3 className="text-4xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">{value.title}</h3>
                      <p className="text-[#fefefe]/80 text-xl leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                  
                  {/* Card decoration */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#ff0054]/20 to-transparent rounded-tl-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative z-10 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-[2px] rounded-2xl shadow-xl">
            <div className="bg-[#060404] rounded-2xl p-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bebas mb-6 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                Want to be part of our story?
              </h2>
              <p className="text-xl text-[#fefefe]/80 mb-8">
                Contact us and discover how we can create unforgettable moments together.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                         text-[#060404] font-bebas text-2xl px-12 py-8 
                         transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-[#ff0054]/50"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-3">
                  CONTACT US
                  <MousePointerClick className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Decoration behind the button */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#ff0054] to-[#fbe40b] rounded-full opacity-20 blur-lg -z-10"></div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#fbe40b] to-[#ff0054] rounded-full opacity-20 blur-lg -z-10"></div>
        </div>
      </div>

      {/* Additional styles for animations */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}