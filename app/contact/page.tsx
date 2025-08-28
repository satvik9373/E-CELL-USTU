"use client";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours',
    contact: 'hello@ecell.edu',
    action: 'mailto:hello@ecell.edu'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our team during business hours',
    contact: '+91 98765 43210',
    action: 'tel:+919876543210'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come visit our office for in-person meetings',
    contact: 'Innovation Hub, IIT Campus, Mumbai 400076',
    action: '#'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our team for quick questions and support',
    contact: 'Available 9 AM - 6 PM IST',
    action: '#'
  }
];

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' }
];

const departments = [
  {
    name: 'General Inquiries',
    email: 'ecell@ustu.edu.in',
    description: 'For general questions about E-Cell and our programs'
  },
  {
    name: 'Events & Partnerships',
    email: 'president.ecell@ustu.edu.in or secretary.ecell@ustu.edu.in',
    description: 'For event registrations and partnership opportunities'
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="px-4 py-2 mb-6">
              Get In Touch
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Contact{' '}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                E-Cell
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
              Have questions about our programs, want to partner with us, or need support? 
              We're here to help and would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="programs">Program Information</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="events">Event Registration</option>
                    <option value="media">Media Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <Button type="submit" className="w-full group">
                  Send Message
                  <Send className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Department Contacts */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  Department Contacts
                </h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="p-4 rounded-lg bg-background border">
                      <h4 className="font-medium text-foreground mb-1">{dept.name}</h4>
                      <p className="text-primary text-sm mb-2">{dept.email}</p>
                      <p className="text-muted-foreground text-sm">{dept.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Visit Our Campus
            </h2>
            <p className="text-muted-foreground">
              Located at Universal SkillTech University, our campus is easily accessible 
              and equipped with modern facilities for meetings and collaborations.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border bg-muted/20">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.430968979808!2d72.91438387503464!3d19.35048318191144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a5004f9c88b3%3A0x1c7dd1a255ef508e!2sUniversal%20SkillTech%20University!5e0!3m2!1sen!2sin!4v1755333989700!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}