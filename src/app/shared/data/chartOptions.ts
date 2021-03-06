import { Constants } from './constants';

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
        arcWidth: 0.15
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
        range: {
            showXAxis: true,
            showYAxis: true,
            gradient: false,
            showLegend: false,
            showXAxisLabel: true,
            xAxisLabel: 'Logged Entry',
            yScaleMin: 0,
            yScaleMax: 1,
            xScaleMin: 0,
            xScaleMax: 10,
            showYAxisLabel: true,
            yAxisLabel: 'Probability',
            timeline: false,
            colorScheme: Constants.chartColorScheme.streaks,
            autoScale: true,
            curve: Constants.chartCurveFunctions.markerDetails
        },
        boolean: {
            showXAxis: true,
            showYAxis: true,
            gradient: false,
            showLegend: false,
            showXAxisLabel: true,
            xAxisLabel: 'Logged Entry',
            showYAxisLabel: true,
            yAxisLabel: 'Total',
            colorScheme: Constants.chartColorScheme.streaks,
        },
        average: {
          legend: false,
          min: 0,
          max: 10,
          bigSegments: 0,
          smallSegments: 0,
          startAngle: 240,
          angleSpan: 240,
          showAxis: false,
          colorScheme: Constants.chartColorScheme.streaks,
        },
        variability: {
            legend: false,
            min: 0,
            max: 5,
            bigSegments: 0,
            smallSegments: 0,
            startAngle: 240,
            angleSpan: 240,
            showAxis: false,
            colorScheme: Constants.chartColorScheme.streaks,
        }
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
            xScaleMax: 10,
            yScaleMin: 0,
            yScaleMax: 10,
            minRadius: 6,
            maxRadius: 10
        },
        linkedAllMarkers: {
            positive : {
                scheme: Constants.chartColorScheme.streaks,
                units: null,
                angleSpan: 240,
                startAngle: 360,
                viewDoughnut: [160, 160],
                doughnut: true,
                tooltipDisabled: true
            },
            negative: {
                scheme: Constants.chartColorScheme.streaksReverse,
                units: null,
                angleSpan: 240,
                startAngle: 360,
                viewDoughnut: [160, 160],
                doughnut: true,
                tooltipDisabled: true
            }
        },
        summary: {
            range: {
                showXAxis: true,
                showYAxis: true,
                gradient: false,
                showLegend: true,
                showXAxisLabel: true,
                xAxisLabel: 'Date',
                yScaleMin: 0,
                yScaleMax: 10,
                showYAxisLabel: true,
                yAxisLabel: 'Logged Value',
                timeline: true,
                colorScheme: Constants.chartColorScheme,
                curve: Constants.chartCurveFunctions.summary.raw
            },
            boolean: {
                showXAxis: true,
                showYAxis: true,
                gradient: false,
                showLegend: true,
                yScaleMin: 0,
                yScaleMax: 1,
                showXAxisLabel: false,
                xAxisLabel: 'Date',
                showYAxisLabel: false,
                yAxisLabel: 'Logged Value (0 = false, 1 = true)',
                timeline: true,
                colorScheme: Constants.chartColorScheme,
                curve: Constants.chartCurveFunctions.summary.raw
            },
            scalar: {
                showXAxis: true,
                showYAxis: true,
                gradient: false,
                showLegend: true,
                showXAxisLabel: true,
                xAxisLabel: 'Date',
                showYAxisLabel: true,
                yAxisLabel: 'Logged Value',
                timeline: true,
                colorScheme: Constants.chartColorScheme,
                curve: Constants.chartCurveFunctions.summary.raw
            },
        }
    }
};
