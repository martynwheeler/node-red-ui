<template>
    <div v-if="hasRooms" id="room">
        <b-container>
            <h2>{{ roomName }}</h2>
            <b-row align-h="center">
                <b-col sm="3" class="text-center p-0 ml-1 mr-1"  v-for="device in deviceList" v-bind:key="deviceList.name">
                    <p>{{ device.name }} - {{ device.function }}</p>
                    <svg-gauge v-if="device.format == 'default'" v-bind:g-value="device.value">
                        <template v-slot:title>
                            {{ device.function | capitalize }}
                        </template>
                    </svg-gauge>
                    <svg-gauge v-else
                        v-bind:g-value="device.value"
                        v-bind:g-min="device.format.min"
                        v-bind:g-max="device.format.max"
                        v-bind:g-decplace="device.format.dp"
                        v-bind:g-units="device.format.units"
                    >
                        <template v-slot:title>
                            {{ device.function | capitalize }}
                        </template>
                    </svg-gauge>
                </b-col>
            </b-row>
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
        'svg-gauge': httpVueLoader('components/DisplayGauge.vue'),
//        'canvas-gauge': httpVueLoader('components/CanvasGauge.vue'),
//        'svg-gauge-new': httpVueLoader('components/SvgGauge.vue'),
    }, // --- End of components --- //
    
    data() {
        return {

        };
    },
    computed: {
        hasRooms() {
            return this.$store.getters['rooms/nRooms'] > 0;
        },
        roomName() {
//            return this.$route.params.roomId;
            return this.$store.getters['rooms/getRoomById'](this.$route.params.roomId);
        },
        deviceList() {
            return this.$store.getters['rooms/getDevicesinRoom'](this.$route.params.roomId);
        },
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
        }
    },
}
</script>