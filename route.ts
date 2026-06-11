import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");

  if (!clientId) {
    return NextResponse.json({ error: "Missing client_id" }, { status: 400 });
  }

  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    redirect_uri: process.env.META_REDIRECT_URI!,
    scope: "ads_read,business_management",
    response_type: "code",
    state: clientId, // pass client_id through state param
  });

  return NextResponse.redirect(
    `https://www.facebook.com/v19.0/dialog/oauth?${params}`
  );
}
