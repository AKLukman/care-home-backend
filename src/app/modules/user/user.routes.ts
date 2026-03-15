import { NextFunction, Request, Response, Router } from 'express';
import { USER_ROLE } from "./user.constant";
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { UserControllers } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';
import { UserValidation } from './user.validation';
import { createCareWorkerValidationSchema } from '../careWorker/careWorker.validation';

const router = Router()

router.post(
    '/create-admin',
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    upload.single( 'file' ),
    ( req: Request, res: Response, next: NextFunction ) => {
        req.body = JSON.parse( req.body.data );
        next();
    },
    validateRequest( createAdminValidationSchema ),
    UserControllers.createAdmin,
);
router.post(
    '/create-careWorker',
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    upload.single( 'file' ),
    ( req: Request, res: Response, next: NextFunction ) => {
        req.body = JSON.parse( req.body.data );

        next();

    },
    validateRequest( createCareWorkerValidationSchema ),
    UserControllers.createCareWorker
);
router.post(
    '/change-status/:id',
    auth( USER_ROLE.superAdmin, USER_ROLE.admin ),
    validateRequest( UserValidation.changeStatusValidationSchema ),
    UserControllers.changeStatus,
);

router.get(
    '/me',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.careWorker,
    ),
    UserControllers.getMe,
);

router.patch(
    "/updateProfile",
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.careWorker,
    ),
    upload.single( 'file' ),

    UserControllers.updateProfile
)
export const UserRoutes = router