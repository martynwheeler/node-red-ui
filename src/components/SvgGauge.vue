<template>
    <div class="wrapper bg-dark text-light border-0">
        <div id="gauge1" class="gauge-container two"></div>
    </div>
</template>

<script>
module.exports = {
    props: {
        'value': {type: Number, default: 0},
    },
    data: function () {return {
        chart: null
    }},
    mounted: function () {
        this.chart = new Gauge(
            document.getElementById("gauge1"), {
                min: 0,
                max: 50,
                dialStartAngle: 180,
                dialEndAngle: 0,
                value: this.value,
                color: function(value) {
                    if (value < 0) {
                        return "#5ee432";
                    } else if(value < 25) {
                        return "#fffa50";
                    } else if(value < 50) {
                        return "#f7aa38";
                    }   else {
                        return "#ef4655";
                    }
                }
            }
        );
    },
    beforeDestroy: function () {
//        this.chart.destroy()
    },
    watch: {
        value: function (val) {
            this.chart.value = val
        },
        options: function (opt) {
//            this.chart.destroy()
//            this.chart = new RadialGauge(Object.assign({}, this.options, {renderTo: 'canvas-gauge', value: this.value})).draw()

        }
    }
}
</script>

<style scoped>
    /* ------ Default Style ---------- */
    .gauge-container {
    width: 250px;
    height: 250px;
    display: block;
    float: left;
    padding: 10px;
    background-color: #222;
    margin: 7px;
    border-radius: 3px;
    position: relative;
    }
    .gauge-container > .label {
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    background: rgba(0,0,0,0.5);
    font-family: monospace;
    font-size: 0.8em;
    padding: 5px 10px;
    }
    .gauge-container > .gauge .dial {
    stroke: #334455;
    stroke-width: 2;
    fill: rgba(0,0,0,0);
    }
    .gauge-container > .gauge .value {
    stroke: rgb(47, 227, 255);
    stroke-width: 2;
    fill: rgba(0,0,0,0);
    }
    .gauge-container > .gauge .value-text {
    fill: rgb(47, 227, 255);
    font-family: sans-serif;
    font-weight: bold;
    font-size: 0.8em;
    }

    /* ------- Alternate Style ------- */
    .wrapper {
    height: 150px;
    float: left;
    margin: 7px;
    overflow: hidden;
    }
    .wrapper > .gauge-container {
    margin: 0;
    }
    .gauge-container.two {
    }
    .gauge-container.two > .gauge .dial {
    stroke: #334455;
    stroke-width: 10;
    }
    .gauge-container.two > .gauge .value {
    stroke: orange;
    stroke-dasharray: none;
    stroke-width: 13;
    }
    .gauge-container.two > .gauge .value-text {
    fill: #ccc;
    font-weight: 100;
    font-size: 1em;
    }
</style>