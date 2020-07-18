const HeaderMenu = httpVueLoader('./components/HeaderMenu.vue');
const IndexView = httpVueLoader('./views/IndexView.vue');
const AdminView = httpVueLoader('./views/AdminView.vue');
const SchedulerView = httpVueLoader('./views/SchedulerView.vue');

export default {
    routes: [
        {
            path: '/',
            name: 'index',
            components: {
                default: IndexView,
                menu: HeaderMenu,
            },
        },
        {
            path: '/scheduler',
            name: 'scheduler',
            components: {
                default: SchedulerView,
                menu: HeaderMenu,
            },
        },
        {
            path: '/rooms',
            name: 'rooms_overview',
            components: {
                default: httpVueLoader('./components/RoomsOverview.vue'),
                menu: HeaderMenu,
            },
            children: [
                {
                    path: ':roomId',
                    name: 'room',
                    component: httpVueLoader('./components/Room.vue'),
                },
            ],
        },
        {
            path: '/admin',
            name: 'admin', 
            components: {
                default: AdminView,
                menu: HeaderMenu,
            },
            children: [
                {
                    path: 'info',
                    name: 'usage_info',
                    component: httpVueLoader('./components/UsageInformation.vue'),
                }
            ]
        },
    ],
};