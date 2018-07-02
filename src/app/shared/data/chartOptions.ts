import { Constants } from '../data/constants';

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
    },
    performance: {
        showXAxis: true,
        showYAxis: true,
        gradient: false,
        showLegend: false,
        showXAxisLabel: true,
        xAxisLabel: 'Logged Entry',
        yScaleMin: 0,
        yScaleMax: 1,
        showYAxisLabel: true,
        yAxisLabel: 'Probability (%)',
        timeline: false,
        colorScheme: Constants.chartColorScheme,
        autoScale: true,
        curve: Constants.chartCurveFunctions.markerDetails
    },
    trends: {
        linked: {
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            showXAxisLabel: true,
            showYAxisLabel: true,
            colorScheme: Constants.chartColorScheme,
            autoScale: false,
            showGridLines: true,
            xScaleMin: 0,
            xScaleMax: 5,
            yScaleMin: 0,
            yScaleMax: 5,
            minRadius: 6,
            maxRadius: 10
        }
    }
};
