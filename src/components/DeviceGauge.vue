<template>
    <b-card v-if="deviceValue !== null" no-body class="bg-secondary text-light">
        <b-card-body class="bg-secondary m-0 pt-0 pb-0 text-center">
            <h5 class="pt-2 titlecase"><slot name="title">Title</slot></h5>
            <b-row ref="gauge" class="gauge-container"></b-row>
        </b-card-body>
    </b-card>
</template>

<script>
module.exports = {
    props: {
        'gaugeDevice': {type: Object},
    },
    data: function () {
        // Set sensible defaults for foramtting
        if (Object.keys(this.gaugeDevice.format).length === 0 && this.gaugeDevice.format.constructor === Object) { // test for empty format object
            this.gaugeDevice.format = {dp: 1, min: 0, max:100, units:"units"}
        }
        return {
            // Data for chart
            chart: null,
            gaugeOptions: {
                chart: {
                    type: 'solidgauge'
                },
                title: null,
                pane: {
                    size: '140%',
                    center: ['50%', '75%'],
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353']  // red
                    ],
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 0,
                    labels: {
                        y: 16,
                        style:{
                            color: '#FFF',
                            fontSize: '14px',
                        },
                    },
                    min: this.gaugeDevice.format.min,
                    max: this.gaugeDevice.format.max,
                    title: null,
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    data: [parseFloat(this.gaugeDevice.value)],
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="color:#FFF; font-size:16px">{y:.' + 
                            this.gaugeDevice.format.dp + 'f} ' +
                            this.gaugeDevice.format.units + '</span></div>'
                        },
                    }
                ],
            }
        }
    },
    computed: {
        deviceValue() {
            return this.$store.getters['rooms/getDeviceValue'](this.$route.params.roomId, this.gaugeDevice)
        },
    },
    created: function() {
    
    },
    mounted: function () {
        Highcharts.setOptions(
            {
                chart: {
                    style: {
                        fontFamily: 'Segoe UI',
                    },
                    backgroundColor:'#6C757D',
                }
            }
        )
        this.chart = Highcharts.chart(
            this.$refs['gauge'], 
            this.gaugeOptions
        )
    },
    watch: {
        deviceValue (newval, oldval) {
            this.chart.series[0].points[0].update(parseFloat(newval))
        },
    }
}
</script>

<style scoped>
.gauge-container {
    height: 180px;
    margin: 0 auto;
}
.titlecase { text-transform: capitalize }
</style>