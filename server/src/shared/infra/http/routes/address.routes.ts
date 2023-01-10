import { Router } from "express";

import { CreateAddressController } from "../../../../modules/address/useCases/CreateAddress/CreateAddressController";
import { SelectAddressController } from "../../../../modules/address/useCases/SelectAddress/SelectAddressController";
import { UpdateAddressControler } from "../../../../modules/address/useCases/UpdateAddress/UpdateAddressController";
import { adressValidator } from "../middlewares/validators/addressValidator";
import { verifyToken } from "../middlewares/verifyToken";

const createAddressController = new CreateAddressController();
const updateAddressControler = new UpdateAddressControler();
const selectAddressController = new SelectAddressController();

const addressRoutes = Router();

addressRoutes.get(
  "/select/:idAddress",
  verifyToken,
  selectAddressController.handle
);

addressRoutes.post(
  "/create",
  adressValidator,
  verifyToken,
  createAddressController.handle
);

addressRoutes.put(
  "/update/:idAddress",
  adressValidator,
  verifyToken,
  updateAddressControler.handle
);

export { addressRoutes };
