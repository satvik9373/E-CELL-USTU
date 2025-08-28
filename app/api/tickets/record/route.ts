import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { eventId, qrPayload, pdfBase64 } = await req.json();
  if (!eventId) return NextResponse.json({ error: "missing_eventId" }, { status: 400 });

  const sb = supabaseAdmin();

  // idempotency: if ticket exists, return it
  const { data: existing } = await sb
    .from("tickets")
    .select("id, pdf_path")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .maybeSingle();
  if (existing) return NextResponse.json({ ticketId: existing.id, pdf: existing.pdf_path });

  // optional upload of PDF
  let pdfPath: string | null = null;
  if (pdfBase64) {
    const buffer = Buffer.from(pdfBase64, "base64");
    const fileName = `${userId}/${crypto.randomUUID()}.pdf`;
    const up = await sb.storage.from("tickets").upload(fileName, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });
    if (up.error) return NextResponse.json({ error: "upload_failed" }, { status: 500 });
    pdfPath = fileName;
  }

  const ins = await sb.from("tickets").insert({
    user_id: userId,
    event_id: eventId,
    status: "RESERVED",
    qr_payload: qrPayload ?? null,
    pdf_path: pdfPath,
  }).select("id, pdf_path").single();

  if (ins.error) return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  return NextResponse.json({ ticketId: ins.data.id, pdf: ins.data.pdf_path });
}
