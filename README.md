# 🚀 E-CELL USTU - Event Booking Platform

<div align="center">

![E-Cell Logo](public/website-images/e-cell-logo.png)

**Empowering Innovation | Building Future Entrepreneurs**

[![Next.js](https://img.shields.io/badge/Next.js-13.5.7-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)](https://supabase.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-purple.svg)](https://clerk.com/)

[🌐 Live Demo](#) | [📖 Documentation](SETUP_README.md) | [🎫 Ticket Design Guide](TICKET_DESIGN_GUIDE.md)

</div>

---

## 📋 About E-Cell USTU

**E-Cell USTU** is the entrepreneurship cell of Universal Skill Tech University, dedicated to fostering innovation and entrepreneurial spirit among students and the broader community. This comprehensive event booking platform serves as the digital hub for all entrepreneurship-related activities, workshops, competitions, and networking events.

### 🎯 Mission
To create a thriving ecosystem of young entrepreneurs by providing them with the right platform, resources, and opportunities to transform their innovative ideas into successful ventures.

## ✨ Key Features

### 🎪 **Event Management**
- **Real-time Event Listings** - Dynamic event catalog with live updates
- **Smart Capacity Management** - Automatic sold-out detection and waitlist management
- **Event Categories** - Workshops, competitions, networking events, and seminars
- **Rich Event Details** - Comprehensive information with venue, timing, and requirements

### 🔐 **Authentication & User Management**
- **Secure Authentication** - Powered by Clerk with social login options
- **User Dashboard** - Personalized experience with booking history
- **Real-time Notifications** - Instant updates on bookings and events
- **Profile Management** - Complete user profile with preferences

### 🎫 **Ticket System**
- **One-Click Booking** - Streamlined event registration process
- **PDF Ticket Generation** - Professional tickets with QR codes
- **Multiple Design Templates** - Classic, Modern, Premium, and Minimal styles
- **Anti-Duplicate System** - Prevents multiple bookings for same event
- **Downloadable Receipts** - Instant ticket downloads post-booking

### 🏢 **Community Features**
- **Team Showcase** - Meet the E-Cell team and advisors
- **Sponsorship Portal** - Partner with us (Bronze, Silver, Gold tiers)
- **Success Stories** - Testimonials and achievements
- **Networking Hub** - Connect with like-minded entrepreneurs

### ⚡ **Technical Excellence**
- **Real-time Updates** - Live synchronization using Supabase Realtime
- **Responsive Design** - Perfect experience across all devices
- **Progressive Web App** - App-like experience with offline capabilities
- **Performance Optimized** - Fast loading with Next.js 13 App Router

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 13, TypeScript, Tailwind CSS |
| **UI Components** | Shadcn/UI, Radix UI, Lucide Icons |
| **Authentication** | Clerk (Social login, JWT) |
| **Database** | Supabase (PostgreSQL + Realtime) |
| **PDF Generation** | jsPDF with custom templates |
| **Styling** | Tailwind CSS, CSS-in-JS |
| **Deployment** | Vercel, Netlify, AWS Amplify |

</div>

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/satvik9373/E-CELL-USTU.git
   cd E-CELL-USTU
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your credentials
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Database Setup**
   - Create tables in Supabase using the schema in [SETUP_README.md](SETUP_README.md)
   - Run the seed script: `seed_events.sql`
   - Enable Row Level Security (RLS)

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Application**
   ```
   http://localhost:3000
   ```

> 📚 **For detailed setup instructions, visit [SETUP_README.md](SETUP_README.md)**

## 📁 Project Structure

```
E-CELL-USTU/
├── app/                          # Next.js 13 App Router
│   ├── (protected)/             # Protected routes
│   │   └── dashboard/           # User dashboard
│   ├── events/                  # Event listings
│   ├── team/                    # Team showcase
│   ├── sponsorship/             # Sponsorship portal
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Shadcn/UI components
│   ├── home/                    # Home page sections
│   └── layout/                  # Layout components
├── lib/                         # Utility functions
│   ├── supabaseClient.ts        # Database client
│   ├── authHelpers.ts           # Authentication
│   ├── database.ts              # Database operations
│   ├── ticket-designs.ts        # Ticket templates
│   └── ticket-generator.ts      # PDF generation
├── public/                      # Static assets
│   ├── website-images/          # UI images
│   └── Event-images/            # Event photos
└── types/                       # TypeScript definitions
```

## 🎨 Screenshots

<!-- Add screenshots here once environment is set up -->
*Screenshots will be added once environment variables are configured*

## 🎫 Ticket Design System

Our advanced ticket system supports multiple design templates:

- **Classic** - Traditional formal design with navy blue header
- **Modern** - Clean contemporary style with accent lines  
- **Premium** - Elegant gold/navy design for special events
- **Minimal** - Simple black and white design

> 🎨 **Learn more in [TICKET_DESIGN_GUIDE.md](TICKET_DESIGN_GUIDE.md)**

## 👥 Team

<div align="center">

| Role | Name | Expertise |
|------|------|-----------|
| **President** | Arjun Sharma | Leadership, Strategy, Product Development |
| **Tech Head** | Rohit Kumar | Full Stack Development, AI/ML, Blockchain |
| **Marketing Head** | Sneha Gupta | Digital Marketing, Brand Building |
| **Finance Head** | Ananya Reddy | Financial Planning, Budget Management |

*View complete team at [/team](app/team/page.tsx)*

</div>

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**

### Environment Variables for Production
Ensure all environment variables are set:
- Clerk authentication keys
- Supabase database credentials
- Any additional API keys

> 🔒 **Never expose service role keys in client-side code**

## 🛡️ Security Features

- **Row Level Security** (RLS) on all database tables
- **JWT-based authentication** with Clerk
- **Input validation** on both client and server
- **HTTPS enforcement** in production
- **Regular dependency audits**

## 📊 Performance

- **⚡ Fast Loading** - Optimized with Next.js 13
- **📱 Mobile First** - Responsive design
- **🔄 Real-time** - Live updates with Supabase
- **💾 Offline Ready** - PWA capabilities
- **🎯 SEO Optimized** - Server-side rendering

## 🆘 Support & Community

- **📧 Email**: support@ecell-ustu.edu
- **🐛 Issues**: [GitHub Issues](https://github.com/satvik9373/E-CELL-USTU/issues)
- **📖 Documentation**: [Setup Guide](SETUP_README.md)
- **💬 Discussions**: [GitHub Discussions](https://github.com/satvik9373/E-CELL-USTU/discussions)

## 🤝 Partnership Opportunities

Interested in sponsoring our events? We offer multiple partnership tiers:

| Tier | Investment | Benefits |
|------|------------|----------|
| **🥉 Bronze** | ₹25,000 | Logo placement, Social media mentions |
| **🥈 Silver** | ₹50,000 | Banner placement, Speaker slot (5min) |
| **🥇 Gold** | ₹1,00,000 | Title sponsorship, Keynote opportunity |

*Learn more at [/sponsorship](app/sponsorship/page.tsx)*

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Universal Skill Tech University** for supporting entrepreneurship
- **Open Source Community** for amazing tools and libraries
- **Contributors** who make this project better every day
- **Sponsors and Partners** who believe in our mission

---

<div align="center">

**Made with ❤️ by E-Cell USTU**

*Empowering the next generation of entrepreneurs*

[![Follow us](https://img.shields.io/badge/Follow-E--Cell%20USTU-blue.svg)](https://github.com/satvik9373)

</div>