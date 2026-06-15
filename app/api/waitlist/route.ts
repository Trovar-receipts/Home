import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const email = (body.email ?? "").trim();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Waitlist: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const row = {
    name: body.name?.trim() || null,
    email,
    practice_name: body.practiceName?.trim() || null,
    phone: body.phone?.trim() || null,
    client_band: body.clientBand || null,
    apps: Array.isArray(body.apps) ? body.apps : [],
    other_apps: body.otherApps?.trim() || null,
    notes: body.notes?.trim() || null,
  };

  const res = await fetch(`${url}/rest/v1/waitlist_signups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Waitlist insert failed:", detail);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
