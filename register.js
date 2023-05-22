const admin = require("firebase-admin");

const serviceAccount = require("./secret/pl-auth-db-firebase-adminsdk-ad7rx-cd9c2abb64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://pl-auth-db-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/api/reg", (req, res) => {
  const { appname, username, token } = req.body;

  // Check if the username already exists
  const ref = db.ref(appname);
  ref
    .orderByChild("username")
    .equalTo(username)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        // Username already exists
        res.status(400).json({ error: "Username already exists." });
      } else {
        // Username doesn't exist, store it in the database
        const newData = { username, token };
        ref
          .push(newData)
          .then(() => {
            res.json({ message: "Data stored successfully." });
          })
          .catch((error) => {
            res.status(500).json({ error: "Error writing to the database." });
          });
      }
    });
});

//  for login

app.post("/api/login", (req, res) => {
  const { appname, username, token,key } = req.body;

  // Check if the appname, username, and token combination already exists
  const ref = db.ref(appname);
  ref
    .orderByChild("username")
    .equalTo(username)
    .once("value", (snapshot) => {
      let existingDataKey = null;
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().token === token) {
          existingDataKey = childSnapshot.key;
        }
      });

      if (existingDataKey) {
        // Combination already exists, update the existing data
        const updates = {};
        updates[`/${appname}/${existingDataKey}`] = {
          username,
          token,
          key: key,
        };

        db.ref()
          .update(updates)
          .then(() => {
            res.json({ message: "Data updated successfully." });
          })
          .catch((error) => {
            res.status(500).json({ error: "Error updating the database." });
          });
      } else {
        // Combination doesn't exist,
        res.json({ message: "not registered" });

        res.status(500).json({ error: "Error updating the database." });
      }
    });
});

//  get req

app.get('/api/auth/:username/:key', (req, res) => {
  const { username, key } = req.params;
  console.log(username,key)

  // Retrieve data from the database based on the username and key
  const ref = db.ref("pl-auth");
  ref
    .orderByChild('username')
    .equalTo(username)
    .once('value', (snapshot) => {
      let matchingData = null;
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().key === key) {
          matchingData = childSnapshot.val();
        }
      });

      if (matchingData) {
        // Key matches, send the HTML page
        const html = `
          <html>
            <head>
              <title>pl-auth</title>
            </head>
            <body>
              <h1>authenticated :</h1>
              <p>Username: ${matchingData.username}</p>
            </body>
          </html>
        `;
        res.send(html);
      } else {
        // Key doesn't match
        res.status(404).send('Invalid key.',username,key);
      }
    });
});



// Start the server
const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
