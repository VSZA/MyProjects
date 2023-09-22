// content.js
const divs = document.querySelectorAll("div.formulation.clearfix");
const spans = document.querySelectorAll("span.qno");
const texts = [];
const qnos=[]
const apiKey = "***************************************"

divs.forEach(div => {
  texts.push(div.textContent);
});

spans.forEach(span => {
  qnos.push(span.textContent);
});

function getAPIKey() {
  const apiKey = prompt("Please enter your OpenAI API key:");
  return apiKey
}

async function callAPI(text, apiKey, i) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "Model": "gpt-3.5-turbo"
  });

  const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      prompt: text,
      max_tokens: 500,
      n: 1,
      stop: "",
      temperature: 0.5,
    })
  });

  const data = await response.json();

  if (!data || !data.choices || !data.choices[0] || !data.choices[0].text) {
    throw new Error("Invalid API response");
  }

  const generatedText = data.choices[0].text;

  console.log(i + "\n"+"Kérdés: " +text + "\n" + "\n" + "Válasz: " + generatedText + "\n" + "-----------------------------------------");
}

async function main() {
  // const apiKey = getAPIKey();
  // console.log(apiKey);

  // add a delay of 5 seconds before the first API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  for (let i = 0; i < texts.length; i++) {
    try {
      await callAPI(texts[i], apiKey, i);
    } catch (error) {
      try {
        await callAPI(texts[i], apiKey, i);
      }
      catch(error){
        console.error(error);
      }

    }
  }
}

main();
