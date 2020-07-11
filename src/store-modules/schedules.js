// Initial state
const stateInitial = {
    schedules: [],
};

const getters = {
    getScheduleByName: (state) => (name) => { // returns the name of a schedule by its name in the current state
        return state.schedules.find(schedule => schedule.name === name);
    },
    nSchedules: (state) => { // returns the number of schedules in the current state
        return state.schedules.length;
    },
}

const actions = {

}

const mutations = {
    SAVE_SCHEDULES(state, schedules) {
        state.schedules = [] // Clear rooms data on reload
        for (const schdeule of schedules){
            state.schedules.push(JSON.parse(schdeule.schedule_obj)) //Extract json string and parse from input
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