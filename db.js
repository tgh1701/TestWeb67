const {MongoClient} = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  return new Promise((resolve, reject) => {
    client.connect((error) => {
      if (error) {
        reject(error);
      } else {
        const database = client.db("TestWeb67");
        db.inventories = database.collection("inventory");
        db.orders = database.collection("order");
        db.users = database.collection("users");
        resolve();
      }
    });
  });
};

module.exports = {connectToDb, db};
