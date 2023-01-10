import { hash } from "bcryptjs";

import { AccountModel } from "../../../../modules/account/model/AccountModel";

async function seedingAdmin() {
  try {
    const passwordHash = await hash("sh@r3n3rgy", 8);

    const data = {
      username: "desafiosharenergy",
      password: passwordHash,
      isAdmin: true,
    };

    const response = await AccountModel.find({
      username: "desafiosharenergy",
    });

    if (response.length > 0) {
      await AccountModel.deleteOne();
    } else {
      await AccountModel.create(data);
    }
  } catch (error) {
    const { message } = error as Error;
    console.log(message);
  }
}

export { seedingAdmin };
