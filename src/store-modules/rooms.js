// Initial state
const stateInitial = {
    rooms: [],
};

const getters = {
    getRoomById: (state) => (id) => { // returns the name of a room by its ID in the current state
        return state.rooms.find(room => room.id === id).name;
    },
    nRooms: (state) => { // returns the number of rooms in the current state
        return state.rooms.length;
    },
    getAllRooms: (state) => { // returns all of the rooms in the current state
        return state.rooms;
    },
    getDevicesinRoom: (state) => (id) => { // returns all of the devices in the selected room by room ID current state
        return state.rooms.find(room => room.id === id).devices;
    },
}

const actions = {
    loadRooms({commit}) { // Not currently used - this gets data from api via axios call and commits mutation
        axios.get('http://192.168.0.136/api').then(result => {
          commit('SAVE_ROOMS', result.data);
        }).catch(error => {
          throw new Error(`API ${error}`);
        });
    },
}

const mutations = {
    ADD_ROOM(state, room) { // Add a room to the state
        state.rooms.push(room)
    },
    SAVE_ROOMS(state, rooms) { // Save ALL incoming room data to the state
        state.rooms = [] // Clear rooms data on reload
        for (const room of rooms){
            state.rooms.push(JSON.parse(room.room_obj)) //Extract json string and parse from input
        }
    },
    UPDATE_VALUE(state, payload){ // Updates the value of a device in room
        let device = state.rooms.find(room => room.id === payload.id).devices
            .find(device => device.name === payload.name && device.function === payload.function)
        device.value = parseFloat(payload.value)
    },
}

export default {
    namespaced: true,
    state: stateInitial,
    getters,
    actions,
    mutations,
};