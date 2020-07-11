<template>
    <div id="usage-info">
        <h2>Setting up Node-RED for messaging</h2>
        <syntax-highlight prefix="msg = " :json="example_room_msg"></syntax-highlight>
    </div>
</template>

<script>
module.exports = {
    name: 'UsageInformation',
    data() {
        return {
            example_room_msg: {
                payload: {
                    power: 'on',
                },
                device_id: 'lamp1-rb',
                device_type: 'lamp-rw',
                room_id: 'master-bedroom',
            },
        };
    },
    components: {
        // This file is located inside the components directory already, in order for http-vue-loader 
        // to resolve correctly, use a relative path to this file
        'syntax-highlight': httpVueLoader('./JSONSyntaxHighlight.vue'),
    },
}
</script>