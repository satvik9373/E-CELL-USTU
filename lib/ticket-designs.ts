// Ticket design configurations
export interface TicketDesign {
  id: string;
  name: string;
  version: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  layout: {
    headerHeight: number;
    contentHeight: number;
    footerHeight: number;
  };
  fonts: {
    title: number;
    subtitle: number;
    body: number;
    footer: number;
  };
  template: 'classic' | 'modern' | 'premium' | 'minimal' | 'custom';
}

export const ticketDesigns: Record<string, TicketDesign> = {
  // Default design (current)
  'default-v1': {
    id: 'default-v1',
    name: 'Classic E-Cell Design',
    version: '1.0',
    colors: {
      primary: '#142257',    // Navy blue
      secondary: '#F5E9D7',  // Gold/cream
      accent: '#FFD700',     // Gold
      background: '#FFFFFF', // White
      text: '#142257'        // Navy blue text
    },
    layout: {
      headerHeight: 60,
      contentHeight: 100,
      footerHeight: 30
    },
    fonts: {
      title: 24,
      subtitle: 18,
      body: 14,
      footer: 10
    },
    template: 'classic'
  },

  // New modern design
  'modern-v2': {
    id: 'modern-v2',
    name: 'Modern Gradient Design',
    version: '2.0',
    colors: {
      primary: '#1a365d',
      secondary: '#2d3748',
      accent: '#ed8936',
      background: '#f7fafc',
      text: '#1a202c'
    },
    layout: {
      headerHeight: 70,
      contentHeight: 110,
      footerHeight: 25
    },
    fonts: {
      title: 26,
      subtitle: 20,
      body: 15,
      footer: 9
    },
    template: 'modern'
  },

  // Premium design for special events
  'premium-v1': {
    id: 'premium-v1',
    name: 'Premium Gold Design',
    version: '1.0',
    colors: {
      primary: '#744210',
      secondary: '#f6e05e',
      accent: '#d69e2e',
      background: '#fffbeb',
      text: '#744210'
    },
    layout: {
      headerHeight: 80,
      contentHeight: 120,
      footerHeight: 35
    },
    fonts: {
      title: 28,
      subtitle: 22,
      body: 16,
      footer: 11
    },
    template: 'premium'
  },

  // Custom PPT Ticket Design
  'ppt-custom-v1': {
    id: 'ppt-custom-v1',
    name: 'PPT Custom Design',
    version: '1.0',
    colors: {
      primary: '#142257',    // Navy blue (adjust based on your PDF)
      secondary: '#F5E9D7',  // Gold/cream (adjust based on your PDF)
      accent: '#FFD700',     // Gold accent (adjust based on your PDF)
      background: '#FFFFFF', // White background
      text: '#142257'        // Navy text
    },
    layout: {
      headerHeight: 70,      // Taller header for your design
      contentHeight: 120,    // Main content area
      footerHeight: 40       // Footer area
    },
    fonts: {
      title: 26,       // Large title
      subtitle: 20,    // Event name
      body: 14,        // Main content
      footer: 10       // Footer text
    },
    template: 'custom'
  }
};

// Event-specific design mapping
export const eventDesignMapping: Record<string, string> = {
  'PPT Workshop': 'ppt-custom-v1',  // Use your custom design
  'Presentation Skills': 'ppt-custom-v1',  // Also use custom design
  'Pitching Event': 'modern-v2',
  'Innovation Summit': 'premium-v1',
  'Entrepreneurship Workshop': 'default-v1',
  'Tech Bootcamp': 'modern-v2',
  // Add new events here
};

// Fallback design if event not found
export const DEFAULT_DESIGN = 'default-v1';
