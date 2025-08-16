import { jsPDF } from 'jspdf';
import { TicketDesign, ticketDesigns, eventDesignMapping, DEFAULT_DESIGN } from './ticket-designs';

export interface TicketData {
  ticketId: string;
  eventName: string;
  attendeeName: string;
  attendeeEmail: string;
  eventDate?: string;
  eventVenue?: string;
  eventTime?: string;
  specialInstructions?: string;
}

export class TicketGenerator {
  private design: TicketDesign;
  
  constructor(eventName: string, designOverride?: string) {
    // Get design for this event
    const designId = designOverride || eventDesignMapping[eventName] || DEFAULT_DESIGN;
    this.design = ticketDesigns[designId];
  }

  // Generate PDF with current design
  generatePDF(ticketData: TicketData): jsPDF {
    const doc = new jsPDF();
    
    switch (this.design.template) {
      case 'modern':
        return this.generateModernTicket(doc, ticketData);
      case 'premium':
        return this.generatePremiumTicket(doc, ticketData);
      case 'minimal':
        return this.generateMinimalTicket(doc, ticketData);
      case 'custom':
        return this.generateCustomPPTTicket(doc, ticketData);
      default:
        return this.generateClassicTicket(doc, ticketData);
    }
  }

  private generateClassicTicket(doc: jsPDF, data: TicketData): jsPDF {
    const { colors, fonts, layout } = this.design;
    
    // Background
    doc.setFillColor(colors.primary);
    doc.rect(0, 0, 210, 297, 'F');
    
    // White ticket area
    doc.setFillColor(colors.background);
    doc.roundedRect(20, 40, 170, 120, 5, 5, 'F');
    
    // Header
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.title);
    doc.text('E-CELL USTU', 105, 60, { align: 'center' });
    
    doc.setFontSize(fonts.subtitle);
    doc.text(data.eventName, 105, 75, { align: 'center' });
    
    // Content
    doc.setFontSize(fonts.body);
    doc.text(`Attendee: ${data.attendeeName}`, 30, 95);
    doc.text(`Email: ${data.attendeeEmail}`, 30, 105);
    doc.text(`Ticket ID: #${data.ticketId}`, 30, 115);
    
    if (data.eventDate) doc.text(`Date: ${data.eventDate}`, 30, 125);
    if (data.eventVenue) doc.text(`Venue: ${data.eventVenue}`, 30, 135);
    
    // Footer
    doc.setFontSize(fonts.footer);
    doc.text('This ticket is valid for entry to the event.', 105, 150, { align: 'center' });
    
    return doc;
  }

  private generateModernTicket(doc: jsPDF, data: TicketData): jsPDF {
    const { colors, fonts } = this.design;
    
    // Gradient background effect (simulate with rectangles)
    doc.setFillColor(colors.primary);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Gradient overlay
    doc.setFillColor(colors.secondary);
    doc.rect(0, 0, 210, 100, 'F');
    
    // Modern ticket card
    doc.setFillColor(colors.background);
    doc.roundedRect(15, 30, 180, 140, 10, 10, 'F');
    
    // Header with accent line
    doc.setFillColor(colors.accent);
    doc.rect(15, 30, 180, 5, 'F');
    
    // Title
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.title);
    doc.text('E-CELL MODERN', 105, 55, { align: 'center' });
    
    // Event name with modern styling
    doc.setFontSize(fonts.subtitle);
    doc.text(data.eventName.toUpperCase(), 105, 75, { align: 'center' });
    
    // Content in modern layout
    doc.setFontSize(fonts.body);
    doc.text(`${data.attendeeName}`, 25, 100);
    doc.text(`${data.attendeeEmail}`, 25, 115);
    doc.text(`#${data.ticketId}`, 25, 130);
    
    // QR code placeholder
    doc.setFillColor(colors.primary);
    doc.rect(140, 90, 40, 40, 'F');
    doc.setTextColor(colors.background);
    doc.setFontSize(8);
    doc.text('QR CODE', 160, 112, { align: 'center' });
    
    return doc;
  }

  private generatePremiumTicket(doc: jsPDF, data: TicketData): jsPDF {
    const { colors, fonts } = this.design;
    
    // Premium background
    doc.setFillColor(colors.background);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Gold border
    doc.setFillColor(colors.accent);
    doc.rect(10, 25, 190, 150, 'F');
    
    // Inner ticket area
    doc.setFillColor(colors.background);
    doc.rect(15, 30, 180, 140, 'F');
    
    // Premium header
    doc.setTextColor(colors.primary);
    doc.setFontSize(fonts.title);
    doc.text('PREMIUM ACCESS', 105, 55, { align: 'center' });
    
    doc.setFontSize(fonts.subtitle);
    doc.text(data.eventName, 105, 75, { align: 'center' });
    
    // Premium content layout
    doc.setFontSize(fonts.body);
    doc.text(`VIP Guest: ${data.attendeeName}`, 25, 100);
    doc.text(`Contact: ${data.attendeeEmail}`, 25, 115);
    doc.text(`Premium Pass: #${data.ticketId}`, 25, 130);
    
    // Premium badge
    doc.setFillColor(colors.accent);
    doc.circle(170, 60, 15, 'F');
    doc.setTextColor(colors.background);
    doc.setFontSize(10);
    doc.text('VIP', 170, 62, { align: 'center' });
    
    return doc;
  }

  private generateMinimalTicket(doc: jsPDF, data: TicketData): jsPDF {
    const { colors, fonts } = this.design;
    
    // Clean white background
    doc.setFillColor(colors.background);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Minimal border
    doc.setDrawColor(colors.primary);
    doc.setLineWidth(2);
    doc.rect(30, 50, 150, 100);
    
    // Clean typography
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.title);
    doc.text(data.eventName, 105, 80, { align: 'center' });
    
    doc.setFontSize(fonts.body);
    doc.text(data.attendeeName, 105, 100, { align: 'center' });
    doc.text(`#${data.ticketId}`, 105, 120, { align: 'center' });
    
    return doc;
  }

  private generateCustomPPTTicket(doc: jsPDF, data: TicketData): jsPDF {
    const { colors, fonts, layout } = this.design;
    
    // Background setup
    doc.setFillColor(colors.background);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Header section (adjust based on your PDF design)
    doc.setFillColor(colors.primary);
    doc.rect(0, 0, 210, layout.headerHeight, 'F');
    
    // Main title
    doc.setTextColor(colors.background);
    doc.setFontSize(fonts.title);
    doc.setFont('helvetica', 'bold');
    doc.text('E-CELL USTU', 105, 25, { align: 'center' });
    
    // Event name
    doc.setFontSize(fonts.subtitle);
    doc.text(data.eventName, 105, 45, { align: 'center' });
    
    // Main ticket area (white card with border)
    const cardY = layout.headerHeight + 20;
    doc.setFillColor(colors.background);
    doc.roundedRect(20, cardY, 170, layout.contentHeight, 8, 8, 'F');
    
    // Add border
    doc.setDrawColor(colors.primary);
    doc.setLineWidth(2);
    doc.roundedRect(20, cardY, 170, layout.contentHeight, 8, 8);
    
    // Decorative accent line
    doc.setFillColor(colors.accent);
    doc.rect(25, cardY + 5, 160, 3, 'F');
    
    // Ticket details
    doc.setTextColor(colors.text);
    doc.setFontSize(fonts.body);
    doc.setFont('helvetica', 'normal');
    
    const detailsY = cardY + 25;
    doc.text(`Attendee: ${data.attendeeName}`, 30, detailsY);
    doc.text(`Email: ${data.attendeeEmail}`, 30, detailsY + 15);
    doc.text(`Event: ${data.eventName}`, 30, detailsY + 30);
    doc.text(`Ticket ID: ${data.ticketId}`, 30, detailsY + 45);
    doc.text(`Date: ${data.eventDate || 'TBD'}`, 30, detailsY + 60);
    doc.text(`Venue: ${data.eventVenue || 'USTU Campus'}`, 30, detailsY + 75);
    
    // QR Code placeholder
    doc.setFillColor(240, 240, 240);
    doc.rect(140, detailsY + 10, 40, 40, 'F');
    doc.setDrawColor(colors.primary);
    doc.setLineWidth(1);
    doc.rect(140, detailsY + 10, 40, 40);
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(8);
    doc.text('QR CODE', 160, detailsY + 32, { align: 'center' });
    
    // Footer section
    const footerY = 297 - layout.footerHeight;
    doc.setFillColor(colors.primary);
    doc.rect(0, footerY, 210, layout.footerHeight, 'F');
    
    doc.setTextColor(colors.background);
    doc.setFontSize(fonts.footer);
    doc.text('Present this ticket at the event venue', 105, footerY + 15, { align: 'center' });
    doc.text('For support: ecell@ustu.ac.in', 105, footerY + 25, { align: 'center' });
    
    // Additional decorative elements (adjust based on your PDF)
    doc.setFillColor(colors.accent);
    doc.circle(180, 30, 8, 'F');
    doc.setTextColor(colors.primary);
    doc.setFontSize(6);
    doc.text('VALID', 180, 32, { align: 'center' });
    
    return doc;
  }

  // Download the ticket
  downloadTicket(ticketData: TicketData): void {
    const doc = this.generatePDF(ticketData);
    doc.save(`ticket-${ticketData.eventName.toLowerCase().replace(/\s+/g, '-')}-${ticketData.ticketId}.pdf`);
  }

  // Get design info
  getDesignInfo(): TicketDesign {
    return this.design;
  }
}
