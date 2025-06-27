export const config = {
    runtime: "nodejs",
  };
  
  import { NextResponse } from "next/server";
  import { Configuration, OpenAIApi } from "openai";
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  export async function POST(request) {
    try {
      const { message } = await request.json();
  
      if (!message) {
        return NextResponse.json({ error: "Message is required" }, { status: 400 });
      }
  
      const completion = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      });
  
      const botReply = completion.data.choices[0].message.content;
  
      return NextResponse.json({ reply: botReply });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "OpenAI request failed" }, { status: 500 });
    }
  }
  