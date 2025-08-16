import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const coreTeam = [
  {
    id: 1,
    name: 'Arjun Sharma',
    role: 'President',
    location: 'Mumbai, India',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Final year Computer Science student with 3 successful startups and passion for innovation.',
    expertise: ['Leadership', 'Strategy', 'Product Development'],
    achievements: ['Founded 2 successful startups', 'TEDx Speaker', 'Forbes 30 Under 30 Nominee'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'arjun@ecell.edu'
    }
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Vice President',
    location: 'Delhi, India',
    image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'MBA student specializing in entrepreneurship and venture capital with industry experience.',
    expertise: ['Business Strategy', 'Fundraising', 'Operations'],
    achievements: ['Ex-Goldman Sachs Analyst', 'Raised ₹5Cr for startups', 'Mentor at 10+ accelerators'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'priya@ecell.edu'
    }
  },
  {
    id: 3,
    name: 'Rohit Kumar',
    role: 'Technical Head',
    location: 'Bangalore, India',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Full-stack developer and tech entrepreneur building scalable solutions for startups.',
    expertise: ['Full Stack Development', 'AI/ML', 'Blockchain'],
    achievements: ['Built 5+ tech products', 'Google Developer Expert', 'Open source contributor'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'rohit@ecell.edu'
    }
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    role: 'Marketing Head',
    location: 'Pune, India',
    image: 'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Digital marketing expert with experience in building brands and communities.',
    expertise: ['Digital Marketing', 'Brand Building', 'Community Management'],
    achievements: ['Grew 3 brands to 100K+ followers', 'Marketing Week Rising Star', 'Content creator'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'sneha@ecell.edu'
    }
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Events Head',
    location: 'Hyderabad, India',
    image: 'https://images.pexels.com/photos/3777953/pexels-photo-3777953.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Event management specialist with experience in organizing large-scale conferences.',
    expertise: ['Event Management', 'Logistics', 'Partnerships'],
    achievements: ['Organized 50+ events', 'Managed conferences for 5000+ attendees', 'Industry partnerships'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'vikram@ecell.edu'
    }
  },
  {
    id: 6,
    name: 'Ananya Reddy',
    role: 'Finance Head',
    location: 'Chennai, India',
    image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Finance and accounting expert ensuring transparent and efficient financial management.',
    expertise: ['Financial Planning', 'Accounting', 'Budget Management'],
    achievements: ['CA finalist', 'Managed ₹1Cr+ budgets', 'Financial advisor to startups'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'ananya@ecell.edu'
    }
  }
];

const advisors = [
  {
    id: 1,
    name: 'Dr. Rajesh Mehta',
    role: 'Faculty Advisor',
    company: 'IIT Mumbai',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Professor of Entrepreneurship with 20+ years of experience in startup ecosystem.',
    expertise: ['Academic Leadership', 'Research', 'Mentorship']
  },
  {
    id: 2,
    name: 'Sunita Kapoor',
    role: 'Industry Mentor',
    company: 'Former VP, Flipkart',
    image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Seasoned executive with expertise in scaling businesses and building teams.',
    expertise: ['Business Strategy', 'Scaling', 'Team Building']
  },
  {
    id: 3,
    name: 'Amit Agarwal',
    role: 'Investor Advisor',
    company: 'Managing Partner, XYZ Ventures',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Angel investor and venture capitalist with portfolio of 50+ successful startups.',
    expertise: ['Investment', 'Due Diligence', 'Portfolio Management']
  }
];

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="px-4 py-2 mb-6">
              Our Team
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Meet The{' '}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Changemakers
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
              Our diverse team of passionate students, experienced mentors, and industry experts 
              working together to foster entrepreneurship and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Core Team
            </h2>
            <p className="text-lg text-muted-foreground">
              The passionate individuals leading our mission to empower entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member) => (
              <div
                key={member.id}
                className="group relative overflow-hidden rounded-2xl bg-background border hover:border-primary/20 transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  
                  {/* Social Links - Show on Hover */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={member.social.linkedin}
                      className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-white transition-all"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-white transition-all"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-white transition-all"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-foreground">Key Achievements:</h4>
                    {member.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="flex items-start text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Advisory Board
            </h2>
            <p className="text-lg text-muted-foreground">
              Experienced mentors and industry leaders guiding our vision and strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor) => (
              <div
                key={advisor.id}
                className="group text-center p-6 rounded-2xl bg-background border hover:border-primary/20 transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="96px"
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {advisor.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-1">{advisor.role}</p>
                <p className="text-muted-foreground text-xs mb-3">{advisor.company}</p>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {advisor.bio}
                </p>

                <div className="flex flex-wrap gap-1 justify-center">
                  {advisor.expertise.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join Our Team
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Are you passionate about entrepreneurship and want to make a difference? 
              We're always looking for dedicated individuals to join our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">
                  Apply to Join
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/programs">
                  View Open Positions
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