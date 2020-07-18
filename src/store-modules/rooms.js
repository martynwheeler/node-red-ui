// Initial state
const stateInitial = {
    rooms: [],
};

const getters = {
    getRoomNameById: (state) => (id) => { // returns the name of a room by its ID in the current state
        return state.rooms.find(room => room.id === id).name
    },
    nRooms: (state) => { // returns the number of rooms in the current state
        return state.rooms.length;
    },
    nDevices: (state) => (id) => { // returns the number of devices in the selected room
        return state.rooms.find(room => room.id === id).devices.length
    },
    nDisplaysByType: (state) => (id, display) => { // returns whether there are devices of the specified display type in a room
        let displays = state.rooms.find(room => room.id === id).devices.find(dev => dev.display === display)
        if (displays) {
            return 1
        } else {
            return 0
        }
    },
    getAllRooms: (state) => { // returns all of the rooms in the current state
        return state.rooms;
    },
    getDevicesinRoom: (state) => (id) => { // returns all of the devices in the selected room by room ID current state
        return state.rooms.find(room => room.id === id).devices
    },
    getDevicesinRoomByDisplay: (state) => (id, display) => { // returns all of the devices by display in the selected room by room ID
        return state.rooms.find(room => room.id === id).devices.filter(dev => dev.display === display)
    },
    getDevicesinRoomByFunction: (state) => (id, func) => { // returns all of the devices by function in the selected room by room ID
        return state.rooms.find(room => room.id === id).devices.filter(dev => dev.function === func)
    },
    getDeviceValue: (state) => (id, device) => { // returns the value from a selected device in a room
        let selectedDevice = state.rooms.find(room => room.id === id).devices.find(dev => dev === device)
        if (selectedDevice) { // only get value of device that exists
            return selectedDevice.value
        }
    },
}

const actions = {
    loadRooms({commit}) { // Not currently used - this gets data from api via axios call and commits mutation
        axios.get('http://192.168.0.136/api').then(result => {
          commit('SAVE_ROOMS', result.data)
        }).catch(error => {
          throw new Error(`API ${error}`)
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
        if (device) { // only update devices that are registered in the db, any other measurements are ignored
            Vue.set(device, 'value', payload.value)
        }
    },
}

export default {
    namespaced: true,
    state: stateInitial,
    getters,
    actions,
    mutations,
};