const admin = require("firebase-admin");

const serviceAccount = require("./secret/pl-auth-db-firebase-adminsdk-ad7rx-cd9c2abb64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://pl-auth-db-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();



function appReg(appName, username, messageToken) {
  // Check if the username already exists
  const ref = db.ref(appName);
  ref
    .orderByChild("username")
    .equalTo(username)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        // Username already exists
        console.log("Username already exists");
        return "Username already exists";
      } else {
        // Username doesn't exist, store it in the database
        const newData = { username, messageToken };
        ref.push(newData, (error) => {
          if (error) {
            console.log("Error writing to the database:", error);
          } else {
            console.log("Data written to the database successfully.");
          }
        });
      }
    });
}

appReg("appname", "loki", "tocken1")
