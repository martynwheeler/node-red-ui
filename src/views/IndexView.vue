<template>
    <div id="index">
        <b-alert :show="hasUnconfiguredItems" variant="warning">
            <h4 class="alert-heading">
                You have unconfigured objects
            </h4>
            <p>
                Please configure them in the <router-link :to="{name: 'admin'}">administration panel</router-link>.
            </p>
        </b-alert>
        <h1>Test for the index page</h1>
        {{hasUnconfiguredItems}}
    </div>
</template>

<script>
// While the browser ES6 modules use `export default`, for http-vue-loader to work `module.exports = ...` has to be used
module.exports = {
    name: 'Index',
    data() {
        return {

        };
    },
    computed: {
        hasUnconfiguredItems() {
            return this.$store.getters.hasUnconfiguredItems;
        },
    },
}
</script>