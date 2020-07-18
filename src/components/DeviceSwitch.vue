<template>
    <b-card no-body class="bg-secondary text-light">
        <b-card-body class="bg-secondary m-0 pt-0 pb-0 text-center">
            <h5 class="pt-2 titlecase"><slot name="title">Title</slot></h5>
            <toggle-switch
                :options="switchOptions"
                @change="toggleSwitch"
                :value="switchValue"
                :group="switchDevice.name"
            ></toggle-switch>
        </b-card-body>
    </b-card>
</template>

<script>
module.exports = {
    props: {
        switchDevice: {type: Object},
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
        }
    },
    methods: {
        toggleSwitch: function(event) {
            this.switchDevice["id"] = this.$route.params.roomId // Add room id for search in store
            this.switchDevice.value = event.value // Assign new value
            var msg = {topic: 'home/' + this.switchDevice.id + '/' + this.switchDevice.name, payload: {[this.switchDevice.function]: event.value}} // build message object
            uibuilder.send(msg) // send it back to NR (this will in turn update the cache)
        },
    },
    computed: {
        switchValue() {
            return this.$store.getters['rooms/getDeviceValue'](this.$route.params.roomId, this.switchDevice)
        },
    },
    created: function() {

    },
    mounted: function () {

    },
    watch: {
        switchValue (newval, oldval) {
//            console.log(newval)
        },
    },
}
</script>

<style scoped>
.titlecase { text-transform: capitalize }
</style>