import * as shape from 'd3-shape';

export const Constants = {
    colors: {
        viewing: 'orange',
        editing: 'green'
    },
    numVisibleDailyRecords: 7,
    chartColorScheme: {
        daysWithMeasurements: {
            domain: ['#89BF29', '#CCC']
        },
        longestStreak:  {
            domain: ['#89BF29', '#CCC']
        },
        trendsLineGraph: {
            domain: ['#89BF29', '#CCC']
        },
        domain: ['#5AA454', '#0097A7', '#9E9D24', '#757575', '#1976D2', '#01579B', '#212121']
    },
    chartCurveFunctions: {
        summary: {
            raw: shape.curveCardinal.tension(1),
            movingAverage: shape.curveCatmullRom.alpha(1),
            globalAverage: shape.curveCatmullRom.alpha(1)
        }
    },
    tooltipTypes: ['description', 'details']
};
