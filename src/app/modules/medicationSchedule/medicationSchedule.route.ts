import { Router } from "express";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createMedicationScheduleSchema, updateMedicationScheduleSchema } from "./medicationSchedule.validation";
import { MedicationScheduleController } from "./medicationSchedule.controller";


const router = Router();

router.post(
    '/',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    validateRequest( createMedicationScheduleSchema ),
    MedicationScheduleController.createMedicationSchedule
);

router.get(
    '/',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.careWorker ),
    MedicationScheduleController.getMedicationSchedules
);

router.get(
    '/:id',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.careWorker ),
    MedicationScheduleController.getMedicationScheduleByPatient
);

router.patch(
    '/:id',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    validateRequest( updateMedicationScheduleSchema ),
    MedicationScheduleController.updateMedicationSchedule
);

router.delete(
    '/:id',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    MedicationScheduleController.deleteMedicationSchedule
);

export const MedicationScheduleRoutes = router;
