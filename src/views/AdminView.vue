<template>
    <div id="admin">
        <!-- basic things, sidebar, and so on -->
        <router-view></router-view>
        <h1>Admin panel</h1>
        <scheduler></scheduler>
    </div>
</template>

<script>
module.exports = {
    name: 'admin',

    components: {
        'scheduler': httpVueLoader('components/Scheduler.vue'),
    }, // --- End of components --- //
    
    data() {
        return {

        };
    },
    computed: {

    },
    filters: {

    },
}
</script>