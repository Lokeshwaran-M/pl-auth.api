axios = require("axios");

async function p() {
  appName = "pl-auth";
  username = "l1";
  token = "to";
  try {
    const response = await axios.post("http://localhost:3000/api/reg", {
      appName,
      username,
      token,
    });

    // Store appName, username, and token in local storage
    const data = {
      appName,
      username,
      token,
    };
    await localStorage.setItem(appName, JSON.stringify(data));

    console.log("Response:", response.data);
    Alert.alert("Success", "Registration successful!");
  } catch (error) {
    console.error("Error:", error);
    Alert.alert("Error", "Registration failed. Please try again.");
  }
}
