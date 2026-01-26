import { Router } from "express";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import { MedicationRecordController } from "./medicationRecord.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateMedicationRecordSchema } from "./medicationRecord.validation";

const router = Router();

router.get(
    '/today',
    auth( USER_ROLE.careWorker, USER_ROLE.admin, USER_ROLE.superAdmin ),
    MedicationRecordController.getTodayMedicationRecords
);

router.patch(
    '/:id',
    auth( USER_ROLE.careWorker, USER_ROLE.admin, USER_ROLE.superAdmin ),
    validateRequest( updateMedicationRecordSchema ),
    MedicationRecordController.updateMedicationStatus
);

export const MedicationRecordRoutes = router;
