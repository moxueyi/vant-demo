import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        children: [
            {
                path: 'grade',
                name: 'Grade',
                component: () => import('../view/Grade.vue'),
            }, {
                path: 'person/:id',
                name: 'person',
                component: () => import('../view/Person.vue'),
            }

        ],
    }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
})

const setupRouter = (app: any) => {
    app.use(router);
}

export default setupRouter;