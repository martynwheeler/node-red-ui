<template>
    <div id="rooms">
        <b-alert variant="info" :show="!hasRooms">
            <p>
                There are no rooms available yet. Pass a message that defines a room id and device id 
                to the uibuilder node first. See <router-link :to="{name: 'usage_info'}">the setup information</router-link> 
                for instructions on how start using the interface.
            </p>
        </b-alert>
        <router-view></router-view>
    </div>
</template>

<script>
module.exports = {
    name: 'RoomsOverview',
    data() {
        return {

        };
    },
    computed: {
        hasRooms() {
            return this.$store.getters['rooms/nRooms'] > 0;
        },
        roomList() {
            return this.$store.getters['rooms/getAllRooms'];
        },
    },
}
</script>