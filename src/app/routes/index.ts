import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.router";
import { AdminRoutes } from "../modules/admin/admin.route";
import { CareWorkerRoutes } from "../modules/careWorker/careWorker.route";

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
    }
]

moduleRoutes.forEach( ( route ) => router.use( route.path, route.route ) );

export default router;