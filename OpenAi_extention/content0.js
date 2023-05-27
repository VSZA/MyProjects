// content.js
const divs = document.querySelectorAll("div.formulation.clearfix");
const spans = document.querySelectorAll("span.qno");
const texts = [];
const qnos=[]

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
APIKey = getAPIKey()
console.log(APIKey)
const headers = new Headers({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${APIKey}`
});

let i=0;
while (i < texts.length){
  
    fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        prompt: texts[i],
        max_tokens: 500,
        n: 1,
        stop: "",
        temperature: 0.5,
        
      })
      })
      .then(response => response.json())
      .then(data => {
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].text) {
          throw new Error("Invalid API response");
        }
        const generatedText = data.choices[0].text;
        
        console.log(texts[i] + generatedText);
      })
      .catch(error => {
        console.error(error);
      
      });
  i++;
}
