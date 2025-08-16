import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const upcomingEvents = [
  {
    id: 1,
    title: 'Startup Pitch Competition',
    description: 'Present your innovative ideas to industry experts and win funding opportunities.',
    date: 'March 15, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Competition',
    registrationOpen: true,
    price: 'Free',
    maxParticipants: 50
  },
  {
    id: 2,
    title: 'Entrepreneurship Workshop',
    description: 'Learn the fundamentals of starting and scaling a successful business.',
    date: 'March 22, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Conference Hall A',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Workshop',
    registrationOpen: true,
    price: '₹500',
    maxParticipants: 100
  },
  {
    id: 3,
    title: 'Investor Connect Meetup',
    description: 'Network with angel investors and venture capitalists looking for promising startups.',
    date: 'April 5, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Innovation Hub',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Networking',
    registrationOpen: true,
    price: '₹1000',
    maxParticipants: 75
  }
];

const pastEvents = [
  {
    id: 4,
    title: 'Annual Innovation Summit 2023',
    description: 'Our flagship event featuring keynote speakers, startup exhibitions, and networking.',
    date: 'November 18-19, 2023',
    attendees: 500,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  },
  {
    id: 5,
    title: 'Tech Startup Bootcamp',
    description: 'Intensive 3-day program covering product development, marketing, and funding.',
    date: 'October 10-12, 2023',
    attendees: 150,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="px-4 py-2 mb-6">
              Events & Programs
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Join Our{' '}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
              Discover opportunities to learn, network, and grow through our carefully curated 
              events designed for aspiring entrepreneurs and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't miss these exciting opportunities to connect, learn, and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-background border rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {event.category}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
                      {event.price}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      Max {event.maxParticipants} participants
                    </div>
                  </div>

                  <Button className="w-full group/btn" asChild>
                    <Link href={`/events/${event.id}/register`}>
                      Register Now
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Want to Host an Event?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Have an idea for an event that could benefit our entrepreneurship community? 
              We'd love to hear from you and help make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">
                  Propose an Event
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/programs">
                  View All Programs
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}