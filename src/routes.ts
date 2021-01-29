import { Router } from "express";

// Routes
import userRouter from "./routes/user";
import groceryListRouter from "./routes/groceryList";
import wishlistRouter from "./routes/wishlist";
import permissionsRouter from "./routes/permissions";

export type Route = {
    path: string,
    router: Router
}

export const routes: Route[] = [
    {
        path: "/user",
        router: userRouter
    },
    {
        path: "/grocery-list",
        router: groceryListRouter
    },
    {
        path: "/wishlist",
        router: wishlistRouter
    },
    {
        path: "/permissions",
        router: permissionsRouter
    },
];