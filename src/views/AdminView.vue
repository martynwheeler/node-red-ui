<template>
    <div id="admin">
        <!-- basic things, sidebar, and so on -->
        <router-view></router-view>
        <h1>Admin panel</h1>
    </div>
</template>

<script>
module.exports = {
    name: 'admin',

    components: {
        
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