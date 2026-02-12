import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.router";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CareWorkerRoutes } from "../modules/careWorker/careWorker.route";
import { PatientRoutes } from "../modules/patient/patient.route";
import { MedicationRoutes } from "../modules/medication/mediction.route";
import { MedicationScheduleRoutes } from "../modules/medicationSchedule/medicationSchedule.route";
import { MedicationRecordRoutes } from "../modules/medicationRecord/medicationRecordRoute.route";


const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/admin",
        route: AdminRoutes
    },
    {
        path: "/care-worker",
        route: CareWorkerRoutes
    },
    {
        path: "/patient",
        route: PatientRoutes
    },
    {
        path: "/medication",
        route: MedicationRoutes
    },
    {
        path: "/medication-schedule",
        route: MedicationScheduleRoutes
    },
    {
        path: "/medicationRecord",
        route: MedicationRecordRoutes
    },
]

moduleRoutes.forEach( ( route ) => router.use( route.path, route.route ) );

export default router;