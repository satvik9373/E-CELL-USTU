import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram, 
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const footerSections = [
  {
    title: 'University',
    links: [
      { name: 'About USTU', href: '/about' },
      { name: 'Mission & Vision', href: '/about#mission' },
      { name: 'Leadership', href: '/about#leadership' },
      { name: 'News & Updates', href: '/news' },
    ]
  },
  {
    title: 'Programs',
    links: [
      { name: 'Campus Ambassadors', href: '/events' },
      { name: 'Innovation Summit', href: '/summit' },
      { name: 'Tech Competitions', href: '/events' },
      { name: 'Summit Chapters', href: '/events' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Speakers', href: '/speakers' },
      { name: 'Sponsors', href: '/sponsors' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Blog', href: '/blog' },
    ]
  }
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/e-cell-ustu/', color: 'hover:text-blue-600' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ecell.ustu/', color: 'hover:text-pink-500' },
];

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 group mb-6">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/Images/e-cell-logo.jpeg"
                    alt="E-Cell USTU"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-foreground">E-Cell USTU</span>
                  <span className="text-sm text-muted-foreground -mt-1">Entrepreneurship Cell</span>
                </div>
              </Link>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Fostering innovation and entrepreneurship through cutting-edge technology education, 
                world-class summits, and transformative learning experiences.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Universal Campus, Near Bhajanlal Dairy & Punyadham, Kaman Bhiwandi Road, Vasai-401208</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <a href="mailto:ecell@ustu.edu.in" className="hover:text-foreground transition-colors">
                    ecell@ustu.edu.in
                  </a>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <a href="tel:+919152051206" className="hover:text-foreground transition-colors">
                    +91 91520 51206
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-2 rounded-lg bg-background hover:bg-accent text-muted-foreground ${social.color} transition-all hover:scale-105`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                      >
                        {link.name}
                        {link.href.startsWith('http') && (
                          <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 E-Cell USTU. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}