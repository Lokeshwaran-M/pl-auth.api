async function postData(appname, username, token) {
  const url = "https://2c8c-2409-4072-612-567a-faca-e67b-588c-4354.ngrok-free.app/api/reg"; // Replace with the URL of your Node.js API endpoint

  const data = {
    appname: appname,
    username: username,
    token: token,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse.message);

  
    } else {
      const errorResponse = await response.json();
      console.log(errorResponse.error); // Error message
 
  
 
    }
  } catch (error) {
    console.log("Error:", error);
  }

}
res = postData("pl-auth", "ken", "token1")
console.log("res : ",res)
