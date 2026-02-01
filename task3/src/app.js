const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;
const connectionUrl = "mongodb://127.0.0.1:27017";
const dbname = "task1";
mongodbClient.connect(connectionUrl, (error, result) => {
  if (error) {
    console.log("Error has occured");
  }
  console.log("All is perfect");

  const db = result.db(dbname);

  //use insertOne to add 2 documents to a collection

  // db.collection("customers").insertOne(
  //   {
  //     name: "Aya",
  //     age: 32,
  //     job: "webdeveloper",
  //   },
  //   (error, res) => {
  //     if (error) {
  //       console.log("Unadle to add a document");
  //     }
  //     console.log(res.insertedId);
  //   },
  // );

  // db.collection("customers").insertOne(
  //   {
  //     name: "Yasmin",
  //     age: 25,
  //     job: "Engineer",
  //   },
  //   (error, res) => {
  //     if (error) {
  //       console.log("Unadle to add a document");
  //     }
  //     console.log(res.insertedId);
  //   },
  // );

  //use insertMany to add 10 documents to the same collection

  // db.collection("customers").insertMany(
  //   [
  //     {
  //       name: "Ibrahim",
  //       age: 27,
  //     },
  //     {
  //       name: "Marwa",
  //       age: 27,
  //     },

  //     {
  //       name: "Zain",
  //       age: 27,
  //     },
  //     {
  //       name: "Dalia",
  //       age: 27,
  //     },
  //     {
  //       name: "Sarah",
  //       age: 27,
  //     },
  //     {
  //       name: "Gehan",
  //       age: 23,
  //     },
  //     {
  //       name: "Hasan",
  //       age: 25,
  //     },

  //     {
  //       name: "Ahmed",
  //       age: 22,
  //     },
  //     {
  //       name: "Fatma",
  //       age: 29,
  //     },

  //     {
  //       name: "Amany",
  //       age: 20,
  //     },
  //   ],
  //   (error, data) => {
  //     if (error) {
  //       console.log("unable to add data");
  //     }
  //     console.log(data.insertedCount);
  //   },
  // );

  //use findOne to retrieve a single document using its _idvalue

  db.collection("customers").findOne(
    {
      _id: mongodb.ObjectId("696f3298ac831712e6a8c878"),
    },
    (error, customer) => {
      if (error) {
        console.log("unable to find the customer");
      }
      console.log(customer);
    },
  );

  //use find to display all documents where the age is 27 and show the count of these doc

  db.collection("customers")
    .find({ age: 27 })
    .limit(3)
    .toArray((error, customers) => {
      if (error) {
        console.log("unable to find customers");
      }
      console.log(customers);
      console.log(customers.length);
    });

  db.collection("customers")
    .find({ age: 27 })
    .limit(4)
    .toArray()
    .then((customers) => {
      console.log(customers);
      console.log(customers.length);

      const ids = customers.map((c) => c._id);
      return db
        .collection("customers")
        .updateMany(
          { _id: { $in: ids } },
          { $set: { name: "Kamal" }, $inc: { age: 4 } },
        );
    })
    .then((result) => console.log(result.modifiedCount))
    .catch((error) => console.log(error));

  db.collection("customers").updateMany({}, { $inc: { age: 10 } });

  db.collection("customers")
    .deleteMany({ age: 41 })
    .then((deletedCustomers) => console.log(deletedCustomers.deletedCount));
});

//for latest version of mongodb

// const { MongoClient } = require("mongodb");

// const connectionUrl = "mongodb://127.0.0.1:27017";
// const dbName = "task1";

// const client = new MongoClient(connectionUrl);

// client.connect().then((result) => {
//   console.log("All is perfect");

//   const db = result.db(dbName);

// Example operation so you can see output
//   return db.collection("users").insertOne({ name: "Aya", age: 25 });
// })
// .then((insertResult) => {
//   console.log("Inserted document with ID:", insertResult.insertedId);
//   client.close();
// })
// .catch((error) => {
//   console.log("Error has occurred:", error);
// });
