import * as shape from 'd3-shape';

export const Constants = {
    colors: {
        viewing: 'orange',
        editing: 'green'
    },
    numVisibleDailyRecords: 7,
    chartColorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    chartCurveFunctions: {
        summary: {
            raw: shape.curveCardinal.tension(1),
            movingAverage: shape.curveCatmullRom.alpha(1),
            globalAverage: shape.curveCatmullRom.alpha(1)
        }
    }
};
