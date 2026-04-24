import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a procurement and sourcing assistant for Elbildad Services LTD, a Nigeria-based company specializing in:
- China sourcing and procurement (factories in Guangzhou, Shenzhen, Yiwu, Ningbo)
- Import logistics into Nigeria (Apapa, Tin Can, Onne ports)
- Regulatory compliance: Form M, NAFDAC, SON certification
- Freight services: FCL/LCL sea freight, air freight, door-to-door
- China visa services: M-type (business), L-type (tourist), X-type (student)
- Pre-shipment inspection and factory audits

You help clients:
- Source specific products from Chinese manufacturers
- Estimate costs (product + freight + clearing + duties)
- Understand Nigerian import procedures and documentation
- Navigate visa applications for China travel
- Understand HS codes and import duties
- Track and manage their orders

Tone: Professional, knowledgeable, and friendly. You represent Elbildad Services LTD.
Language: Respond in English. If the user writes in Hausa, respond in Hausa.
Always remind clients that Elbildad handles everything end-to-end — they don't need to worry about the complexity.
Keep responses concise and actionable.`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text = response.content[0]?.text || "I could not process that request.";
    return Response.json({ reply: text });
  } catch (error) {
    console.error("Claude API error:", error);
    return Response.json(
      { error: "Failed to get response from AI assistant" },
      { status: 500 }
    );
  }
}
