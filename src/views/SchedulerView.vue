<template>
    <div id="scheduler">
        <!-- basic things, sidebar, and so on -->
        <router-view></router-view>
        <h1>Scheduler panel</h1>
        <scheduler></scheduler>
    </div>
</template>

<script>
module.exports = {
    name: 'schedule',

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