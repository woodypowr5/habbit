import { Constants } from './../constants';

export const ChartOptions = {
    daysWithMeasurements: {
        scheme: Constants.chartColorScheme.daysWithMeasurements,
        showXAxis: false,
        showYAxis: false,
        gradient: false,
        showLegend: false,
        showXAxisLabel: false,
        showYAxisLabel: false,
        doughnut: true,
        arcWidth: 0.25
    },
    streaks: {
        scheme: Constants.chartColorScheme.streaks,
        min: 0,
        max: null,
        units: null,
        angleSpan: 240,
        startAngle: -120,
        showAxis: false,
        legend: false,
        viewDoughnut: [160, 160],
        viewGauge: [180, 180],
        valueFormatting: null
    }
};
