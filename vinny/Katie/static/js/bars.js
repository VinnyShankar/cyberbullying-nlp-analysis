export {drawBars}

function drawBars()
{
    var categ = d3.select("#selCategory").node().value
    console.log(categ)

    d3.json(`/api/v1.0/barchart/${categ}`)
    .then(data =>
    {
        console.log(data)
             
        var pos = 0
        var neu = 0
        var neg = 0
        var tot = 0
        // category_array = []

        // for (let x of data)
        // {
        //     category_array.push(x["category"])
        // }

        // category_array = [...new Set(category_array)].sort()
        // console.log(category_array)
        looper()
        function looper()
        {
        for (let y of data)
        {
            if (y["score"] == 2)
            {
            pos += 1
            }
            else if (y["score"] == 1)
            {
            neu += 1
            }
            else if (y["score"] == 0)
            {
            neg += 1
            }
        }
        }
        
        tot = pos+neu+neg
        
        console.log(tot)
        console.log(pos)
        console.log(neu)
        console.log(neg)

        // var index = category_array.indexOf('Music');
        // console.log(index)

        var dom = document.getElementById('chart-container');
        var myChart = echarts.init(dom, 'dark', {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var app = {};

        var option;

            const posList = [
                'left',
                'right',
                'top',
                'bottom',
                'inside',
                'insideTop',
                'insideLeft',
                'insideRight',
                'insideBottom',
                'insideTopLeft',
                'insideTopRight',
                'insideBottomLeft',
                'insideBottomRight'
            ];
            app.configParameters = {
                rotate: {
                min: -90,
                max: 90
                },
                align: {
                options: {
                    left: 'left',
                    center: 'center',
                    right: 'right'
                }
                },
                verticalAlign: {
                options: {
                    top: 'top',
                    middle: 'middle',
                    bottom: 'bottom'
                }
                },
                position: {
                options: posList.reduce(function (map, pos) {
                    map[pos] = pos;
                    return map;
                }, {})
                },
                distance: {
                min: 0,
                max: 100
                }
            };
            app.config = {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                onChange: function () {
                const labelOption = {
                    rotate: app.config.rotate,
                    align: app.config.align,
                    verticalAlign: app.config.verticalAlign,
                    position: app.config.position,
                    distance: app.config.distance
                };
                myChart.setOption({
                    series: [
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    }
                    ]
                });
                }
            };
            const labelOption = {
                show: true,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                name: {}
                }
            };
            option = {
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
                },
                legend: {
                data: ['Total', 'Positive', 'Neutral', 'Negative']
                },
                toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
                },
                xAxis: [
                {
                    type: 'category',
                    axisTick: { show: true },
                    data: [categ],
                    axisLabel: {rotate: 45}
                }
                ],
                yAxis: [
                {
                    type: 'value'
                }
                ],
                series: [
                {
                    name: 'Total',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    emphasis: {
                    focus: 'series'
                    },
                    data: [tot]
                },
                {
                    name: 'Positive',
                    type: 'bar',
                    label: labelOption,
                    emphasis: {
                    focus: 'series'
                    },
                    data: [pos]
                },
                {
                    name: 'Neutral',
                    type: 'bar',
                    label: labelOption,
                    emphasis: {
                    focus: 'series'
                    },
                    data: [neu]
                },
                {
                    name: 'Negative',
                    type: 'bar',
                    label: labelOption,
                    emphasis: {
                    focus: 'series'
                    },
                    data: [neg]
                }
                ]
            };
    }
    )
}