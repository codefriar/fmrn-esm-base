import dbConnection from "mongoose";

dbConnection.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = dbConnection.connection;

db.once("open", (_) => {
  console.log("Connected to database");
});

db.on("error", (err) => {
  console.error("Mongodb connection error:", err);
});

export default db;
