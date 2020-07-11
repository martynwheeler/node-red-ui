<template>
    <b-card no-body class="bg-dark text-light align-items-center">
        <b-card-body class="m-0 pt-0 pb-0">
            <h5><slot name="title">Title</slot></h5>
            <div class="row mini-gauge pt-3">
                <vue-svg-gauge
                    class="mini-gauge"
                    :start-angle="-90"
                    :end-angle="90"
                    :value="gValue"
                    :separator-step="0"
                    :min="gMin"
                    :max="gMax"
                    base-color="#595959"
                    :gauge-color="[{ offset: 0, color: '#347AB0'}, { offset: 100, color: '#D10404'}]"
                    :scale-interval="0"
                >
                    <div style="line-height: 11rem">{{gValue.toFixed(gDecplace)}}  <span v-html="gUnits"></span></div>
                </vue-svg-gauge>
            </div>
            <div class="row mini-gauge">
                <div class="col" align="left">{{gMin}}</div>
                <div class="col" align="right">{{gMax}}</div>
            </div>
        </b-card-body>
    </b-card>
</template>

<script>
module.exports = {
    /** Parameters with defaults
     * @see https://vuejs.org/v2/guide/components-props.html#Prop-Validation
     */
    props: {
        'gMin': {type: Number, default: 0},
        'gMax': {type: Number, default: 100},
        'gValue': {type: Number, default: 0},
        'gUnits': {type: String, default: ""},
        'gDecplace': {type: Number, default: 0},
    },

    /** Any data must be wrapped in a fn to isolate it in case this component is used multiple times */
    data: function() { return {

    }}
}
</script>

<style scoped>
    .mini-gauge {
        max-width: 250px
    }

    h1,h2,h3,h4,h5,h6,p {
        color: #fff;
    }
</style>