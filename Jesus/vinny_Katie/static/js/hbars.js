export {hBars}

function hBars()
{
    d3.json(`/api/v1.0/stackedbars`)
    .then(data =>
    {
        var pos_array = []
        var neu_array = []
        var neg_array = []

        var category_array = []

        for (let x of data)
        {
            category_array.push(x["category"])
        }
        category_array = category_array.filter(e => e !== 'Nonprofit')
        category_array = [...new Set(category_array)].sort()


        looper()
        function looper()
        {
            for (let x of category_array)
            {
                var pos = 0
                var neu = 0
                var neg = 0

                for (let y of data)
                {
                    if (y["category"] == x && y["score"] == 2)
                    {
                        pos += 1
                    }
                    else if (y["category"] == x && y["score"] == 1)
                    {
                        neu += 1
                    }
                    else if (y["category"] == x && y["score"] == 0)
                    {
                        neg += 1
                    }
                }
                pos_array.push(pos)
                neu_array.push(neu)
                neg_array.push(neg)
            }
        }

        var chartDom = document.getElementById('stacked-bar');
        var myChart = echarts.init(chartDom, 'dark');
        var option;

        option = {
        title: {
            text: "Comment Breakdown",
            subtext: "All Categories",
            textStyle: {
                fontSize: 25
              },
              subtextStyle: {
                fontSize: 15
              },
              show: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow' 
            }
        },
        legend: {
            left: "40%",
            top: "4%"
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: category_array
        }, 
        series: [
            {
            name: 'Negative',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: neg_array, 
            itemStyle: {
                color: "#fc6d73"
            }
            },
            {
            name: 'Neutral',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: neu_array, 
            itemStyle: {
                color: "#fce46d"
            }
            },
            {
            name: 'Positive',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: pos_array, 
            itemStyle: {
                color: "#80ffb5"
            }
            }
        ]
        };

        if (option && typeof option === 'object')
        {
            myChart.setOption(option);
        }
    })
}