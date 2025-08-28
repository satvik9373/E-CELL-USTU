import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserTickets } from "@/lib/database";

export async function GET() {
  const { userId: clerkUserId } = auth();
  
  console.log('🔍 API called - checking authentication...');
  
  if (!clerkUserId) {
    console.error('❌ No Clerk user ID found - user not authenticated');
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    console.log('🎫 Fetching tickets for Clerk user:', clerkUserId);
    
    // Direct database call - no complex user mapping
    const tickets = await getUserTickets(clerkUserId);
    
    console.log(`✅ Found ${tickets.length} tickets for user ${clerkUserId}`);
    console.log('📋 Ticket details:', JSON.stringify(tickets, null, 2));
    
    if (tickets.length === 0) {
      console.log('📝 No tickets found - user should book events');
      console.log('💡 Make sure tickets exist in database with user_id =', clerkUserId);
    }

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error("💥 Error in tickets API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
