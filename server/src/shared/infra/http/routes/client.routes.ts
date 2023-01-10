import { Router } from "express";

import { CreateClientController } from "../../../../modules/client/useCases/createClient/CreateClientController";
import { DeleteClientController } from "../../../../modules/client/useCases/deleteClient/DeleteClientController";
import { ListClientsController } from "../../../../modules/client/useCases/listClients/ListClientsController";
import { SelectClientController } from "../../../../modules/client/useCases/selectClient/SelectClientController";
import { UpdateClientController } from "../../../../modules/client/useCases/updateClient/UpdateClientController";
import { clientUpdateValidator } from "../middlewares/validators/clientUpdateValidator";
import { clientValidator } from "../middlewares/validators/clientValidator";

const createClientController = new CreateClientController();
const selectClientController = new SelectClientController();
const listClientsController = new ListClientsController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

const clientRoutes = Router();

clientRoutes.post("/", clientValidator, createClientController.handle);

clientRoutes.get("/select/:idClient", selectClientController.handle);

clientRoutes.get("/list", listClientsController.handle);

clientRoutes.put(
  "/update/:idClient",
  clientUpdateValidator,
  updateClientController.handle
);

clientRoutes.delete("/delete/:idClient", deleteClientController.handle);

export { clientRoutes };
