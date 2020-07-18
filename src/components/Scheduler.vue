<template> <!-- Need to make it mobile friendly-->
    <div v-if="hasSchedules" id="scheduler">
        <b-container>
            <b-row align-h="center">
                <b-col md="4" class="text-center p-0 ml-1 mr-1">
                    <b-card class="bg-secondary text-light">
                        <h5 class="card-title pb-2 text-left">Select Schedule Item</h5>
                        <b-row v-for="(i, idx) in 3" :key="i" align-h="center">
                            <span v-for="j in [idx*4 + 1, idx*4 + 2, idx*4 + 3, idx*4 + 4]">
                                <input type="radio" class="shed" :id="`shd-${j}`" :value="`shd-${j}`" v-model="picked" @click="changeSchedule">
                                <label v-if="j < 10" :for="`shd-${j}`">0{{ j }}</label>
                                <label v-else :for="`shd-${j}`">{{ j }}</label>
                            </span>
                        </b-row>
                    </b-card>
                    <input type="hidden" id="init" value="yes">
                </b-col>
                <b-col md="4" class="border p-0 ml-1 mr-1">
                    <b-card id="shd-itm" class="bg-secondary text-light">
                        <h5 class="card-title pb-2 text-left">Schedule Item</h5>
                        <table>
                            <tr><td><input type="text" id="shd-function" class="mb-2 shd-txtbox" v-model="schedule.function"><label class="valLabel">Function</label></td></tr>
                            <tr><td><input type="text" id="shd-topic" class="mb-2 shd-txtbox" v-model="schedule.topic"><label class="valLabel">Topic</label></td></tr>
                            <tr><td><input type="time" id="shd-st" class="mb-2" v-model="schedule.ontime"><label for="shd-st" class="valLabel">Start time</label></td></tr>
                            <tr><td><input type="text" id="shd-st-v" class="valMedium mb-2" v-model="schedule.onpayload"><label class="valLabel">Start Value</label></td></tr>
                            <tr><td><input type="time" id="shd-et" class="mb-2" v-model="schedule.offtime"><label for="shd-et" class="valLabel">End time</label></td></tr>
                            <tr><td><input type="text" id="shd-et-v" class="valMedium mb-2" v-model="schedule.offpayload"><label class="valLabel">End Value</label></td></tr>
                        </table>
                        <label class="labLabel pt-2">Day of the week</label>
                        <b-col class="mb-1 p-0">
                            <input type="checkbox" id="shd-dow-1" class="dow" v-model="schedule.dofweek[1]"><label for="shd-dow-1">Mon</label>	
                            <input type="checkbox" id="shd-dow-2" class="dow" v-model="schedule.dofweek[2]"><label for="shd-dow-2">Tue</label>
                            <input type="checkbox" id="shd-dow-3" class="dow" v-model="schedule.dofweek[3]"><label for="shd-dow-3">Wed</label>
                            <input type="checkbox" id="shd-dow-4" class="dow" v-model="schedule.dofweek[4]"><label for="shd-dow-4">Thu</label>
                        </b-col>
                        <b-col class="mb-1 p-0">
                            <input type="checkbox" id="shd-dow-5" class="dow" v-model="schedule.dofweek[5]"><label for="shd-dow-5">Fri</label>
                            <input type="checkbox" id="shd-dow-6" class="dow" v-model="schedule.dofweek[6]"><label for="shd-dow-6">Sat</label>
                            <input type="checkbox" id="shd-dow-0" class="dow" v-model="schedule.dofweek[0]"><label for="shd-dow-0">Sun</label>
                        </b-col>
                        <div class="mt-3">
                            <table>
                                <tr><td><input type="date" id="shd-StartDate" class="valLarge mb-2" v-model="schedule.startdate"><label class="valLabel" >Start</label></td></tr>
                                <tr><td><input type="date" id="shd-EndDate" class="valLarge mb-2" v-model="schedule.enddate"><label class="valLabel" >End</label></td></tr>
                            </table>
                        </div>
                        <div class="mt-3">
                        <span v-if="schedule.suspended">
                            <input type="checkbox" id="shd-disabled" class="dis" checked><label for="shd-disabled">Disable</label>
                        </span>
                        <span v-else>
                            <input type="checkbox" id="shd-disabled" class="dis"><label for="shd-disabled">Disable</label>
                        </span>
                        <button class="valMedium set" id="shd-set" v-bind:style="buttonStyle" @click="updateSchedule">Set</button>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
module.exports = {
    data() {
        return { // on first load set the selected schedule to 1
            picked: 'shd-1',
            counter: 0,
            buttonStyle: {},
            hasChanged: false,
        }
    },
    computed: {
        hasSchedules() { // Determine if schedules have loaded into vuex
            return this.$store.getters['schedules/nSchedules'] > 0
        },
        schedule() { // return the current schedule object
            return this.$store.getters['schedules/getScheduleByName'](this.picked)
        }
    },
    created: function () {
        // send a message back to node-red to get the schedule data
        var msg = {topic: 'scheduleData'}
        uibuilder.send(msg)
    },
    methods: {
        updateSchedule: function(event) { // Send message back to nr to update the schedule -- to do: button colour change
            var schedule = {} //build a json array of params for sql update in nr
            for (const [key, value] of Object.entries(this.schedule)) {
                schedule[`$${key}`] = value
            }
            //Send the first message
            var msg = {topic: "setSchedules", params: schedule}
            uibuilder.send(msg)
            // now build array to update dow
            var days = ['$sun', '$mon', '$tue', '$wed', '$thu', '$fri', '$sat']
            schedule = {$id: this.schedule.id}
            // Loop over days to store boolean as 1/0
            for (dow = 0; dow< 7; dow++) {
                schedule[days[dow]] = this.schedule.dofweek[dow] ? 1 : 0 // change to 1/0
            }
            //Send the second message
            var msg = {topic: "setDays", params: schedule}
            uibuilder.send(msg)
            this.resetStyle()
        },
        resetStyle: function() {
            this.buttonStyle = {}
            this.counter = 1
            this.hasChanged = false
        },
        changeSchedule: function() {            
            if (this.hasChanged) {
                if (confirm("Unsaved changes, press OK to save or Cancel to discard changes")) {
                    this.updateSchedule()
                } else {
                    this.resetStyle()
                }
            }
            this.counter = 0
        },
    },
    watch: {
        schedule: {
            handler() {
                this.counter++ // hack because the scheduler object changes upon initialisation
                if (this.counter > 1) {
                    this.hasChanged = true
                    this.buttonStyle = {'background-color': 'red', color: 'white'}
                }
            },
            deep: true,
        },
    },
    filters: {
        
    },
}
</script>

<style scoped>
    input[type=radio].shed  { display:none; }
    input[type=radio].shed + label{ min-width: 50px; border: 1px solid #486170; padding: 13px; margin: 2px; border-radius:3px;}
    input[type=radio].shed:checked + label{ background-color: #7A7A7A;}

    input[type=checkbox].dow  { display:none; }
    input[type=checkbox].dow + label{ min-width: 55px; border: 1px solid #486170; padding: 10px; margin: 0 0 0 0; border-radius:3px; text-align:center;}
    input[type=checkbox].dow:checked + label{ background-color:#7A7A7A;}

    input[type=checkbox].dis   { display:none; }
    input[type=checkbox].dis + label{ min-width: 75px; border: 1px solid #486170; padding: 7px; margin:0 0 0 0; border-radius:3px; text-align:center;}
    input[type=checkbox].dis:checked + label{border: 1px solid #FF7443; background-color:#FF7443;}

    button.set { min-width: 75px; border: 1px solid #486170; padding: 7px; margin:0 0 0 0; border-radius:3px; text-align:center;}

    input[type="text"]{border: 1px solid #cccccc; border-radius:3px; color:#3C3C3C;}
    input[type="text"]:disabled { color: #486170;}
    input[type="time"]{border: 1px solid #cccccc;  border-radius:3px; color:#3C3C3C; font-size: 1.0em;}
    input[type="time"]:disabled { color: #486170;}
    input[type="date"]{border: 1px solid #cccccc;  border-radius:3px; color:#3C3C3C; font-size: 1.0em;}
    input[type="date"]:disabled { color: #486170;}

    .shd-txtbox {width: 250px;}

    .valMedium {width: 75px;}
    .valLarge {width: 155px;}
    .valLabel {padding-left: 15px; font-size: 0.8em;}
    .labLabel {padding-left: 0px; font-size: 0.8em;}
</style>