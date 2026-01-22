import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { CareWorkerControllers } from "./careWorker.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateCareWorkerValidationSchema } from "./careWorker.validation";

const router = Router()

router.get( '/',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    CareWorkerControllers.getAllCareWorkers
)

router.get(
    '/:id',
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    CareWorkerControllers.getSingleCareWorker,
);

router.patch(
    '/:id',
    auth( USER_ROLE.superAdmin, USER_ROLE.careWorker ),
    validateRequest( updateCareWorkerValidationSchema ),
    CareWorkerControllers.updateCareWorker,
);

router.delete(
    '/:careWorkerId',
    auth( USER_ROLE.superAdmin ),
    CareWorkerControllers.updateCareWorker,
);


export const CareWorkerRoutes = router