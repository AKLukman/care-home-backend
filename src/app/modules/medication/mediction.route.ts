import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { MedicationControllers } from "./mdecation.controller";
import { createMedicationValidationSchema, updateMedicationValidationSchema } from "./mediaction.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";



const router = Router();

router.post(
    '/',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    validateRequest( createMedicationValidationSchema ),
    MedicationControllers.createMedication
);

router.get( '/',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    MedicationControllers.getAllMedications
);


router.patch(
    '/:id',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    validateRequest( updateMedicationValidationSchema ),
    MedicationControllers.updateMedication
);

router.delete( '/:id',
    auth( USER_ROLE.admin, USER_ROLE.superAdmin ),
    MedicationControllers.deleteMedication
);

export const MedicationRoutes = router;
