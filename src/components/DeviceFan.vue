<template>
    <b-card no-body class="bg-secondary text-light">
        <b-card-body class="bg-secondary m-0 pt-0 pb-0 text-center">
            <h5 class="pt-2 titlecase"><slot name="title">Title</slot></h5>
            <toggle-switch
                :options="switchOptions"
                @change="toggleSwitch"
                :value="switchValue"
                :group="fanDevice.name"
            ></toggle-switch>
            <b-row align-h="center" class="m-1">
                <select class="selector" v-model="selectedThermometer">
                    <option disabled value="">Select thermometer</option>
                    <option :value="thermometer" v-for="thermometer in thermometerList">{{ thermometer.name }}</option>
                </select>
            </b-row>
            <b-row align-h="center" class="m-1">
                <input type="text" v-model="onTemperature" placeholder="Set temperature">
            </b-row>
            <b-row align-h="center" class="m-1">
                <button class="set" @click="setFanTemperature">Set</button>
                <button class="set" @click="cancelFanTemperature">Cancel</button>
            </b-row>
        </b-card-body>
    </b-card>
</template>

<script>
module.exports = {
    props: {
        fanDevice: {type: Object},
    },
    data: function () {
        return {
            switchOptions: {
                size: {
                    height: 2,
                    width: 6,
                    fontSize: 0.8,
                    padding: 0.4,
                },
            },
            selectedThermometer: '',
            onTemperature: '',
        }
    },
    methods: {
        toggleSwitch: function(event) {
            this.fanDevice["id"] = this.$route.params.roomId // Add room id for search in store
            this.fanDevice.value = event.value // Assign new value
            var msg = {topic: 'home/' + this.fanDevice.id + '/' + this.fanDevice.name, payload: {[this.fanDevice.function]: event.value}} // build message object
            uibuilder.send(msg) // send it back to NR (this will in turn update the cache)
        },
        setFanTemperature: function(event) {
            this.fanDevice["id"] = this.$route.params.roomId // Add room id for search in store
            var msgPayload = {
                thermometer: 'home/' + this.fanDevice.id + '/' + this.selectedThermometer.name,
                temperature: this.onTemperature,
                topic: 'home/' + this.fanDevice.id + '/' + this.fanDevice.name,
            }
            var msg = {topic: 'home/' + this.fanDevice.id + '/' + this.fanDevice.name, setFan: msgPayload} // build message object
            uibuilder.send(msg) // send it back to NR (this will in turn update the cache)
        },
        cancelFanTemperature: function(event) {
            this.fanDevice["id"] = this.$route.params.roomId // Add room id for search in store
            var msg = {topic: 'home/' + this.fanDevice.id + '/' + this.fanDevice.name, setFan: {}} // build message object
            uibuilder.send(msg) // send it back to NR (this will in turn update the cache)
        }
    },
    computed: {
        switchValue() {
            return this.$store.getters['rooms/getDeviceValue'](this.$route.params.roomId, this.fanDevice)
        },
        thermometerList() {
            return this.$store.getters['rooms/getDevicesinRoomByFunction'](this.$route.params.roomId, 'temperature')
        },
    },
    created: function() {

    },
    mounted: function () {
        //console.log(this.thermometerList)
    },
    watch: {

    },
}
</script>

<style scoped>
    .titlecase { text-transform: capitalize; }
    .set { width: 70px; height: 30px; border: 1px solid #486170; margin:0 0 0 0; border-radius:3px; text-align:center; }
    .selector { width: 150px; height: 30px; border: 1px solid #cccccc; border-radius:3px; color:#3C3C3C; }
    input[type="text"] { width: 150px; height: 30px; border: 1px solid #cccccc; border-radius:3px; color:#3C3C3C; }
</style>