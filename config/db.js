const { connect } = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI_DB;
  const db = await connect(uri);
  const { name, port, host } = db.connection;
  console.log(
    `Database (name: ${name}) connection successful for port: ${port}, host: ${host}`
      .cyan
  );
};

module.exports = connectDB;
