import { GoogleGenerativeAI } from "@google/generative-ai";

/* 課金管理
https://aistudio.google.com/billing?billing=01547F-91153A-C1DF91
*/

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "APIキーが設定されていません" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // console.log(model)

    const result = await model.generateContentStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (e) {
          controller.error(e);
        } finally {
          controller.close();
        }
      },
    });

    // 2. ヘッダーでストリーミングであることを明示する
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: "通信失敗" }, { status: 500 });
  }
}