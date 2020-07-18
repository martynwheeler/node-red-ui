import rooms from './store-modules/rooms.js';
import schedules from './store-modules/schedules.js';

export default {
    state: {
        unconfiguredRooms: [], // Not used at present
        unconfiguredDevices: [], // Not used at present
    },
    getters: { // Not used at present
        hasUnconfiguredItems: state => state.unconfiguredRooms.length !== 0 || state.unconfiguredDevices.length !== 0,
    },
    mutations: { // Not used at present
        addRoomtoUnconfigured (state, room) {
            state.unconfiguredRooms.push(room)
        },
    },
    actions: {

    },
    modules: {
        rooms,
        schedules,
    },
};