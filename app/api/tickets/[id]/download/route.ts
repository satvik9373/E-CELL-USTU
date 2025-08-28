import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId: clerkUserId } = auth();
  if (!clerkUserId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const sb = supabaseAdmin();
    
    // Simple ticket ownership check using Clerk user ID directly
    const { data: ticket, error } = await sb
      .from("tickets")
      .select("pdf_path")
      .eq("id", params.id)
      .eq("user_id", clerkUserId)
      .single();

    if (error || !ticket) {
      console.error("Ticket not found or access denied:", error);
      return NextResponse.json({ error: "ticket_not_found" }, { status: 404 });
    }

    if (!ticket.pdf_path) {
      return NextResponse.json({ error: "no_pdf_available" }, { status: 404 });
    }

    // Generate signed URL
    const { data: signedUrl, error: urlError } = await sb.storage
      .from("tickets")
      .createSignedUrl(ticket.pdf_path, 60);

    if (urlError || !signedUrl) {
      console.error("Failed to generate signed URL:", urlError);
      return NextResponse.json({ error: "failed_to_generate_url" }, { status: 500 });
    }

    return NextResponse.json({ url: signedUrl.signedUrl });
  } catch (error) {
    console.error("Error in download API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
