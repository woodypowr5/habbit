export const TooltipText = {
    navigation: {

    },
    plan: {

    },
    trends: {
        summary: {
            trendTypeButtons: {
                rawMeasurements: 'See the actual records you\'ve created and the corresponding individual '
                    + 'measurements along the timeline',
                movingAverage: 'A moving average is used to smooth out short-term fluctuations and provide '
                    + 'insight into longer-term trends and cycles',
                globalAverage: 'Shows a running average of all records up to that point in time. The further '
                    + 'along in time, the more accurate the global average'
            }
        },
        links: {
            chartTypeButtons: {
                simpleComparison: 'Compare the relationship between two activities on a traditional scatter plot. This '
                    + 'helps to visualize the relationship between them. The '
                    + 'more the plot resembles a line, the more likely it is that there is a strong '
                    + 'correlation between the variables',
                correlationProfile: 'Choose an activity and see how strongly that activity is correlated with all '
                    + 'of your other activities. This information can help you to choose which activities to focus '
                    + 'on in your daily life ',
                bayesianAnalysis: 'Investigate how the outcome of certain activites has affected the probability '
                    + 'of the outcomes of other activites throughout your history. This can be useful in predicting '
                    + 'a causal relationship betweeen activities'
            }
        }
    },
    tracking: {
        markerDetails: {
            entries: 'These are the scores that describes how often you create entries while using Habbit. Trying to beat'
                    + ' your longest streak to a great way to improve your scores. It\'s important to note that'
                    + ' the higher your scores here, the more accurate your other results will be!',
            performance: 'This shows statistics about how you\'ve scored your own daily entries in this activity.'
                    + ' Use this data to see how you\'ve improved towards your goals, or to just see if you\re improving',
            stdDeviation: 'Standard deviation is a number used to tell how measurements for a group are spread out from'
                    + ' the average (mean), or expected value. A low standard deviation means that most of the numbers'
                    + ' are very close to the average. A high standard deviation means that the numbers are spread out.',
            cdfGraph: 'This display shows the past likelyhood (from your history) that the entry for that day will have'
                    + ' been a certain value. However, like the stock market, be aware that past result do not garuntee'
                    + ' future results',
            booleanVariability: '1 = Yes, 0 = No'
        }
    }
};
