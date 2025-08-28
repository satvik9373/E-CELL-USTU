# Ticket Design Guide

This guide explains how to easily update ticket designs for different events using the modular ticket system.

## Current Ticket System

The ticket system consists of two main files:
- `lib/ticket-designs.ts` - Contains all design configurations
- `lib/ticket-generator.ts` - Handles PDF generation with different templates

## Available Design Templates

1. **Classic** - Traditional formal design with navy blue header
2. **Modern** - Clean contemporary style with accent lines
3. **Premium** - Elegant gold/navy design for special events
4. **Minimal** - Simple black and white design

## How to Add a New Event Design

### Option 1: Use Existing Template
Simply add your event to the `eventDesignMapping` in `ticket-designs.ts`:

```typescript
export const eventDesignMapping: { [eventName: string]: string } = {
  "Startup Pitch Night": "premium",
  "Innovation Workshop": "modern",
  "Entrepreneurship Summit": "classic",
  "Networking Mixer": "minimal",
  // Add your new event here:
  "Tech Talk Series": "modern",
  "Business Plan Competition": "premium"
};
```

### Option 2: Create Custom Design
1. Add a new design configuration to `ticketDesigns`:

```typescript
export const ticketDesigns: { [key: string]: TicketDesign } = {
  // ... existing designs
  techEvent: {
    name: 'Tech Event',
    template: 'modern',
    colors: {
      primary: '#1a1a1a',    // Dark background
      secondary: '#00ff88',   // Neon green
      accent: '#ff6b00',      // Orange accent
      background: '#ffffff',
      text: '#1a1a1a'
    },
    fonts: {
      title: 22,
      subtitle: 16,
      body: 12,
      small: 10
    },
    layout: {
      width: 210,
      height: 297,
      margin: 20,
      cardPadding: 15
    }
  }
};
```

2. Map your event to the new design:

```typescript
export const eventDesignMapping: { [eventName: string]: string } = {
  // ... existing mappings
  "Tech Innovation Summit": "techEvent"
};
```

## Testing Different Designs

You can test how different designs look by temporarily changing the event mapping or by creating a test file:

```typescript
// test-ticket.ts
import { TicketGenerator } from './lib/ticket-generator';

const testTicket = () => {
  const generator = new TicketGenerator('Test Event', 'premium'); // Force premium design
  
  const ticketData = {
    ticketId: 'TEST001',
    eventName: 'Test Event',
    attendeeName: 'John Doe',
    attendeeEmail: 'john@example.com',
    eventDate: '2024-02-15',
    eventVenue: 'USTU Campus'
  };
  
  generator.downloadTicket(ticketData);
};
```

## Design Versioning

To maintain design history, you can add version numbers:

```typescript
export const ticketDesigns: { [key: string]: TicketDesign } = {
  classic_v1: { /* original classic design */ },
  classic_v2: { /* updated classic design */ },
  // Current version (no suffix means latest)
  classic: { /* current classic design */ }
};
```

## Quick Changes for Common Updates

### Change Event Colors
Update the `colors` object in your design:
```typescript
colors: {
  primary: '#your-primary-color',
  secondary: '#your-secondary-color',
  // ... other colors
}
```

### Adjust Font Sizes
Modify the `fonts` object:
```typescript
fonts: {
  title: 24,      // Larger title
  subtitle: 18,   // Bigger subtitle
  body: 12,       // Normal body text
  small: 10       // Small details
}
```

### Change Layout
Update spacing and dimensions:
```typescript
layout: {
  width: 210,        // A4 width
  height: 297,       // A4 height
  margin: 25,        // Larger margins
  cardPadding: 20    // More padding
}
```

## Best Practices

1. **Test Before Events**: Always test ticket generation before launching event registration
2. **Backup Designs**: Keep copies of working designs before making changes
3. **Consistent Branding**: Ensure new designs align with E-CELL USTU branding
4. **Responsive Text**: Test with long event names and user names
5. **Print Quality**: Verify designs look good when printed

## Emergency Quick Fix

If you need to quickly change a design for an ongoing event:

1. Find the event in `eventDesignMapping`
2. Change it to a different template (`classic`, `modern`, `premium`, `minimal`)
3. Save the file - changes take effect immediately

Example:
```typescript
// Quick fix: Change from broken custom design to working classic
"Problem Event": "classic"  // Was: "custom_broken_design"
```

## Support

For help with ticket designs:
- Check existing designs in `lib/ticket-designs.ts`
- Test with `lib/ticket-generator.ts`
- Contact the development team for complex customizations
