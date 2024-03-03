import OpenAI from "openai";

let openai: OpenAI;
let inputTimeout: NodeJS.Timeout;

async function getEmojis(elem: HTMLInputElement) {
  elem.classList.add("emojis-loading");
  const { choices } = await openai.chat.completions.create({
    messages: [
      { role: "user", content: `Suggest 3 emojis for "${elem.value}"` },
    ],
    model: "gpt-3.5-turbo",
  });
  elem.classList.remove("emojis-loading");
  return choices[0]?.message?.content;
}