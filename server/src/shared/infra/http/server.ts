import { connection } from "../database/mongoose/connection";
import { seedingAdmin } from "../database/seed/seedingAdmin";
import { app } from "./app";

connection();

seedingAdmin();

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
