// Initial state
const stateInitial = {
    devices: [],
};

const getters = {
    getDeviceById: (state) => (id) => {
        return state.devices.find(device => device.id === id);
    },
    nDevices: (state) => {
        return state.devices.length;
    }
}

const actions = {

}

const mutations = {
    addDevice (state, device) {
        state.devices.push(device)
    },
}

export default {
    namespaced: true,
    state: stateInitial,
    getters,
    actions,
    mutations,
};