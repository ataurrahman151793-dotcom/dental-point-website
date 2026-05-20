import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const formId = process.env.FORMSPREE_FORM_ID;

    if (!formId) {
      // No Formspree ID set — log only in development, still respond success
      if (process.env.NODE_ENV !== "production") {
        console.log("[contact form — no FORMSPREE_FORM_ID set]", JSON.stringify(data, null, 2));
      }
      return NextResponse.json({ success: true });
    }

    const payload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      emi_required: data.hasInsurance === "yes"
        ? `Yes — ${data.insurancePlan || "not specified"}`
        : "No",
      message: data.message || "(no message)",
      _subject: `Appointment request — ${data.firstName} ${data.lastName}`,
      _replyto: data.email,
    };

    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[contact form] Formspree error", err);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact form] unexpected error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
