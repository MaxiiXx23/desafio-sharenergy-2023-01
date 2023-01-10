import mongoose from "mongoose";

async function connection() {
  try {
    await mongoose.connect("mongodb://root:example@mongo:27017/");
    console.log("Conectado ao DB.");
  } catch (error) {
    console.log(error);
  }
}

export { connection };
