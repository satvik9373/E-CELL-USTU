import { Badge } from '@/components/ui/badge';

export default function WhatIsUSTU() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-6">
            About E-Cell
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            What is {' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">
              E-cell USTU
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            E-Cell USTU is the entrepreneurship cell of Universal Skill Tech University, dedicated to 
            fostering innovation and entrepreneurial spirit among students and the broader community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">50K+</div>
              <div className="text-muted-foreground text-sm">Active Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">500+</div>
              <div className="text-muted-foreground text-sm">Industry Partners</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">100+</div>
              <div className="text-muted-foreground text-sm">Countries Reached</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">95%</div>
              <div className="text-muted-foreground text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}