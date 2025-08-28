// Example usage for recording tickets after successful booking
// Place this code in your success/thank-you page

// Example: /app/success/page.tsx or wherever you handle post-booking flow

"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const [ticketRecorded, setTicketRecorded] = useState(false);
  const searchParams = useSearchParams();
  
  // Get these from your booking flow
  const eventId = searchParams.get('eventId');
  const qrPayload = searchParams.get('qrPayload');
  
  useEffect(() => {
    if (eventId && !ticketRecorded) {
      recordTicket();
    }
  }, [eventId, ticketRecorded]);

  const recordTicket = async () => {
    try {
      // Optional: Generate PDF on client side
      // const pdfBlob = await generateTicketPDF(ticketData);
      // const pdfBase64 = await blobToBase64(pdfBlob);

      const response = await fetch("/api/tickets/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,             // UUID of the event the user booked
          qrPayload,           // whatever you encode in QR
          // pdfBase64         // base64 string without data: prefix (optional)
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Ticket recorded:', result.ticketId);
        setTicketRecorded(true);
      } else {
        console.error('Failed to record ticket:', result.error);
      }
    } catch (error) {
      console.error('Error recording ticket:', error);
    }
  };

  // Helper function to convert blob to base64 (if generating PDF on client)
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:application/pdf;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1>Booking Successful!</h1>
      <p>Your ticket has been reserved.</p>
      
      {ticketRecorded && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>✅ Ticket recorded successfully!</p>
          <p>You can view your tickets in the <a href="/dashboard/tickets" className="text-blue-600 underline">dashboard</a>.</p>
        </div>
      )}
    </div>
  );
}

// Alternative: If you want to record ticket immediately after payment processing
// Call this function after successful payment:

export const recordTicketAfterPayment = async (
  eventId: string,
  qrPayload?: string,
  pdfBase64?: string
) => {
  try {
    const response = await fetch("/api/tickets/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        qrPayload,
        pdfBase64
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      return { success: true, ticketId: result.ticketId, pdf: result.pdf };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};
