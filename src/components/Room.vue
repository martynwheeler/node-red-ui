<template>
    <div v-if="hasRooms" id="room">
        <b-container>
            <h2>{{ roomName }}</h2>
            <div v-if="hasGauges">
                <h4>Sensor Readings</h4>
                <b-row align-h="center">
                    <b-col xl="3" class="text-center p-0 m-1" v-for="gauge in gaugeList" v-bind:key="gaugeList.name">
                        <device-gauge v-if="gauge.enabled"
                            :gauge-device="gauge"
                            :key="componentKey"
                        >
                            <template v-slot:title>
                                {{ gauge.function }}
                            </template>
                        </device-gauge>
                    </b-col>
                </b-row>
            </div>
            <div v-if="hasSwitches">
                <h4>Switches</h4>
                <b-row align-h="center">
                    <b-col xl="2" class="text-center p-0 m-1" v-for="swit in switchList" v-bind:key="switchList.name">
                        <device-switch v-if="swit.enabled"
                            :switch-device="swit"
                            :key="componentKey"
                        >
                            <template v-slot:title>
                                {{ swit.function | removeUnderscore }}
                            </template>
                        </device-switch>
                    </b-col>
                </b-row>
            </div>
            <div v-if="hasFans">
                <h4>Fans</h4>
                <b-row align-h="center">
                    <b-col xl="4" class="text-center p-0 m-1" v-for="fan in fanList" v-bind:key="fanList.name">
                        <device-fan v-if="fan.enabled"
                            :fan-device="fan"
                            :key="componentKey"
                        >
                            <template v-slot:title>
                                {{ fan.function | removeUnderscore }}
                            </template>
                        </device-fan>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
module.exports = {
    name: 'room',

    /** Load external component files
     *  Make sure there is no leading / in the name
     *  To load from the common folder use like: 'common/component-name.vue' */
    components: {
        'device-gauge': httpVueLoader('components/DeviceGauge.vue'),
        'device-fan': httpVueLoader('components/DeviceFan.vue'),
        'device-switch': httpVueLoader('components/DeviceSwitch.vue'),
    }, // --- End of components --- //
    
    data() {
        return {
            componentKey: 0,
        };
    },
    methods: {
        forceRerender() {
            this.componentKey += 1
        },
    },
    computed: {
        hasRooms() {
            return this.$store.getters['rooms/nRooms'] > 0;
        },
        hasGauges() {
            return this.$store.getters['rooms/nDisplaysByType'](this.$route.params.roomId, 'gauge') > 0;
        },
        hasSwitches() {
            return this.$store.getters['rooms/nDisplaysByType'](this.$route.params.roomId, 'switch') > 0;
        },
        hasFans() {
            return this.$store.getters['rooms/nDisplaysByType'](this.$route.params.roomId, 'fan') > 0;
        },
        roomName() {
            return this.$store.getters['rooms/getRoomNameById'](this.$route.params.roomId);
        },
        deviceList() {
            return this.$store.getters['rooms/getDevicesinRoom'](this.$route.params.roomId);
        },
        gaugeList() {
            return this.$store.getters['rooms/getDevicesinRoomByDisplay'](this.$route.params.roomId, 'gauge');
        },
        switchList() {
            return this.$store.getters['rooms/getDevicesinRoomByDisplay'](this.$route.params.roomId, 'switch');
        },
        fanList() {
            return this.$store.getters['rooms/getDevicesinRoomByDisplay'](this.$route.params.roomId, 'fan');
        },
    },
    watch: {
        '$route.params.roomId' () {
            this.forceRerender()
        }
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        tonumber: function (value){
            if (!value) return ''
            return parseFloat(value)
        },
        removeUnderscore: function (value) {
            if (!value) return ''
            return value.replace(/_/g, " ")
        },
    },
}
</script>