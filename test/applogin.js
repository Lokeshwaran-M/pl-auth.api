const performPostRequest = async () => {
  const apiUrl = 'http://localhost:3000/api/login'; // Replace with your API endpoint URL

  const requestData = {
    appname: 'pl-auth',
    username: 'Lok',
    token: "Lok9120159234",
    key:"drd"
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Success response
    } else {
      const errorData = await response.json();
      console.log(errorData); // Error response
    }
  } catch (error) {
    console.log('Error:', error); // Network error or other exception
  }
};
performPostRequest()