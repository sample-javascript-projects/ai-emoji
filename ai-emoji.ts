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

export function initialise({ apiKey }) {
  if (
    !(this instanceof HTMLInputElement && this.type === "text") &&
    !(this instanceof HTMLTextAreaElement)
  ) {
    throw new Error("This plug-in works best with textboxes");
  }

  if (!apiKey) {
    throw new Error("Providing OpenAI key is mandatory");
  }
}