"use client";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Award, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const sponsorshipPlans = [
  {
    tier: "Bronze",
    price: "₹25,000",
    position: "z-10",
    features: [
      "Logo placement on event materials",
      "Mention in social media posts",
      "Certificate of appreciation",
      "Event photos and highlights",
      "Basic networking opportunities"
    ],
    buttonVariant: "outline" as const
  },
  {
    tier: "Gold",
    price: "₹1,00,000",
    position: "z-30 transform scale-105",
    popular: true,
    features: [
      "All Silver benefits",
      "Title sponsor recognition",
      "Prime logo placement",
      "Keynote speaking opportunity",
      "Dedicated booth space",
      "Co-branding opportunities",
      "Student internship programs",
      "Year-long partnership benefits",
      "Exclusive networking dinner",
      "Media coverage inclusion"
    ],
    buttonVariant: "default" as const
  },
  {
    tier: "Silver",
    price: "₹50,000",
    position: "z-20",
    features: [
      "All Bronze benefits",
      "Logo on event banners",
      "Dedicated social media post",
      "Speaker slot (5 minutes)",
      "VIP seating arrangement",
      "Direct student interaction",
      "Event merchandise branding"
    ],
    buttonVariant: "outline" as const
  }
];

export default function SponsorshipPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Partnership Opportunities
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Want to Become Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Sponsor?
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Partner with us to empower the next generation of entrepreneurs and innovators. 
              Join leading companies in supporting cutting-edge education and startup development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3" asChild>
                <Link href="/contact">
                  Download Proposal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Plans */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {/* 3D Pricing Cards */}
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {sponsorshipPlans.map((plan, index) => (
                <div key={plan.tier} className={`relative ${plan.position}`}>
                  <Card className={`
                    relative overflow-hidden transition-all duration-300 hover:shadow-2xl
                    ${plan.popular ? 'border-2 border-primary shadow-xl' : 'border shadow-lg'}
                    ${plan.popular ? 'bg-gradient-to-br from-primary to-primary/90 text-white' : 'bg-white'}
                  `}>

                    <CardHeader className="text-center pt-8 pb-4">
                      <CardTitle className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                        {plan.tier}
                      </CardTitle>
                      <div className="mb-4">
                        <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-primary'}`}>
                          {plan.price}
                        </span>
                        <span className={`ml-2 ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          per event
                        </span>
                      </div>
                      <CardDescription className={`text-base ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {plan.tier === "Gold" && "Premium partnership with maximum exposure"}
                        {plan.tier === "Silver" && "Enhanced visibility and engagement"}
                        {plan.tier === "Bronze" && "Essential partnership benefits"}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-8">
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className={`
                              h-5 w-5 mr-3 mt-0.5 flex-shrink-0
                              ${plan.popular ? 'text-primary-foreground/80' : 'text-green-600'}
                            `} />
                            <span className={`text-sm ${plan.popular ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        variant={plan.buttonVariant} 
                        size="lg" 
                        className={`
                          w-full py-3
                          ${plan.popular ? 'bg-white text-primary hover:bg-primary-foreground/95 border-white' : ''}
                        `}
                        asChild
                      >
                        <Link href="/contact">
                          {plan.popular ? (
                            <>
                              <Crown className="mr-2 h-4 w-4" />
                              Choose {plan.tier}
                            </>
                          ) : (
                            <>
                              <Award className="mr-2 h-4 w-4" />
                              Select {plan.tier}
                            </>
                          )}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
