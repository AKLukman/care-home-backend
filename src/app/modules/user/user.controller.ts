import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.services";


const createAdmin = catchAsync( async ( req, res ) => {
    const { password, admin: adminData } = req.body;

    const result = await UserServices.createAdminIntoDB(
        req.file,
        password,
        adminData,
    );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created successfully',
        data: result,
    } );
} );
const createCareWorker = catchAsync( async ( req, res ) => {
    const { password, careWorker: careWorkerData } = req.body;


    const result = await UserServices.createCareWorkerIntoDB(
        req.file,
        password,
        careWorkerData,
    );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'CareWorker is created successfully',
        data: result,
    } );
} );

const getMe = catchAsync( async ( req, res ) => {
    const { email, role } = req.user;
    const result = await UserServices.getMe( email, role );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is retrieved successfully',
        data: result,
    } );
} );

const changeStatus = catchAsync( async ( req, res ) => {
    const id = req.params.id;

    const result = await UserServices.changeStatus( id as string, req.body );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Status is updated successfully',
        data: result,
    } );
} );

export const UserControllers = {
    createAdmin,
    createCareWorker,
    changeStatus,
    getMe

};