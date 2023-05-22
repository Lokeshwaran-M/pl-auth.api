
const admin = require("firebase-admin");

const serviceAccount = require("./secret/pl-auth-db-firebase-adminsdk-ad7rx-cd9c2abb64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pl-auth-db-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();
function writeToDatabase(appName, username, messageToken) {
    const ref = db.ref(appName);
    const newData = {
      username,
      messageToken,
    };
  
    ref.push(newData, (error) => {
      if (error) {
        console.error('Error writing to the database:', error);
      } else {
        console.log('Data written to the database successfully.');
      }
    });
  }
  
writeToDatabase('appname', 'name1', 'tocken1');
writeToDatabase('appname', 'name2', 'tocken2');
writeToDatabase('appname', 'name3', 'tocken3');