import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CareWorkerServices } from "./careWorker.services";
import httpStatus from 'http-status'

const getAllCareWorkers = catchAsync( async ( req, res ) => {
    const result = await CareWorkerServices.getAllCareWorkers( req.query )

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Care worker is retrieved successfully',
        data: result,
    } );
} )

const getSingleCareWorker = catchAsync( async ( req, res ) => {
    const { id } = req.params;
    const result = await CareWorkerServices.getSingleCareWorkerFromDB( id as string );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Care Worker is retrieved successfully',
        data: result,
    } );
} );

const updateCareWorker = catchAsync( async ( req, res ) => {
    const { id } = req.params;
    const { careWorker } = req.body;
    const result = await CareWorkerServices.updateCareWorkerFromDB( id as string, careWorker );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Care Worker is updated successfully',
        data: result,
    } );
} );

const deleteCareWorker = catchAsync( async ( req, res ) => {
    const { careWorkerId } = req.params;
    const result = await CareWorkerServices.deleteCareWokerFromDB( careWorkerId as string );

    sendResponse( res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Care worker is deleted successfully',
        data: result,
    } );
} );

export const CareWorkerControllers = {
    getAllCareWorkers,
    getSingleCareWorker,
    updateCareWorker,
    deleteCareWorker
}