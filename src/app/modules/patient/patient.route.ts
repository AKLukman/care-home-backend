import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { PatientControllers } from "./patient.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PatientValidations } from "./patient.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.post( "/create-patient",
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    upload.single( 'file' ),
    ( req: Request, res: Response, next: NextFunction ) => {
        req.body = JSON.parse( req.body.data );

        next();

    },
    validateRequest( PatientValidations.createPatientValidationSchema ),
    PatientControllers.insertIntoDB
)

router.get( "/",
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    PatientControllers.getPatientsFromDB
)
router.get( "/:id",
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    PatientControllers.getSinglePatients
)
router.patch( "/:id",
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    validateRequest( PatientValidations.updatePatientValidationSchema ),
    PatientControllers.updatePatient
)

export const PatientRoutes = router
