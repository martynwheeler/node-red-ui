<template>
    <div>
        <h3>{{ title }}</h3>
        <canvas id="canvas-gauge"></canvas>
    </div>
</template>

<script>
module.exports = {
    props: {
        'value': {type: Number, default: 0},
        'title': {type: String, default: "hello"},
        'options': {type: Object, default: ({})},
    },
    data: function () {return {
        chart: null
    }},
    mounted: function () {
        this.chart = new RadialGauge(Object.assign({}, this.options, { renderTo: 'canvas-gauge', value: this.value })).draw()
    },
    beforeDestroy: function () {
        this.chart.destroy()
    },
    watch: {
        value: function (val) {
            this.chart.value = val
        },
        options: function (opt) {
            this.chart.destroy()
            this.chart = new RadialGauge(Object.assign({}, this.options, {renderTo: 'canvas-gauge', value: this.value})).draw()
        }
    }
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