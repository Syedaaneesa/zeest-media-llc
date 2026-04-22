
 const fetchAPI = async () => {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyDilli6kcti2BKBhoICH7L8atOGqokk3qs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: "Write a short welcome message" }]
          }
        ]
      }),
    }
  );
  const data = await response.json();
  console.log(data?.candidates[0].content);
  
 }


 fetchAPI();