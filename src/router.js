import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home";
import Gameboard from "./pages/Gameboard";
import Admin from "./pages/Admin";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Home},
        {path: "/admin", component: Admin},
        {path: "/:roomId", component: Gameboard},
    ]
})

export default router;