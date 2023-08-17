// ###########################
// Initialize bar chart
// ###########################
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

// Create an array to store selected categories from the second dropdown
let selectedCategories = [];

// Define initial options
let options = {
  xAxis: {
    data: ["Automobiles"] // Initial empty data
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
      data: [] // Initial empty data
    },
    {
      name: 'Positive',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Neutral',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Negative',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    }
  ]
};

// Set initial chart options
if (options && typeof options === 'object') {
  myChart.setOption(options);
}


// ###########################
// Iniitialize Multiple Category Box Plot
// ###########################
var chartDom = document.getElementById('box-plot');
var myChart = echarts.init(chartDom, 'dark');
var option;
// Generate data.
function makeData() {
  let data = [];
  for (let i = 0; i < 18; i++) {
    let cate = [];
    for (let j = 0; j < 100; j++) {
      cate.push(Math.random() * 200);
    }
    data.push(cate);
  }
  return data;
}

const data0 = makeData();
const data1 = makeData();
const data2 = makeData();

option = {
  title: {
    text: "Multiple Categories",
    left: "center"
  },
  dataset: [
    {
      source: data0
    },
    {
      source: data1
    },
    {
      source: data2
    },
    {
      fromDatasetIndex: 0,
      transform: { type: 'boxplot' }
    },
    {
      fromDatasetIndex: 1,
      transform: { type: 'boxplot' }
    },
    {
      fromDatasetIndex: 2,
      transform: { type: 'boxplot' }
    }
  ],
  legend: {
    top: '10%'
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    top: '20%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    nameGap: 30,
    splitArea: {
      show: true
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    name: 'Score',
    min: -200,
    max: 400,
    splitArea: {
      show: false
    }
  },
  // dataZoom: [
  //   {
  //     type: 'inside',
  //     start: 0,
  //     end: 20
  //   },
  //   {
  //     show: true,
  //     type: 'slider',
  //     top: '90%',
  //     xAxisIndex: [0],
  //     start: 0,
  //     end: 20
  //   }
  // ],
  series: [
    {
      name: 'Large Channels',
      type: 'boxplot',
      datasetIndex: 3
    },
    {
      name: 'Small Channels',
      type: 'boxplot',
      datasetIndex: 4
    }
  ]
};

// Set initial chart options
// if (options && typeof options === 'object') {
//   myChart.setOption(options);
// }

option && myChart.setOption(option);



// Get page dropdown
const pageSelect = document.getElementById('selCategory');

// Handle page dropdown change
pageSelect.addEventListener('change', () => {
  // Clear selectedCategories array
  selectedCategories = [];

  // Get selected category from page dropdown
  const selectedCategory = pageSelect.value;

  // Update xAxis data
  options.xAxis.data = [selectedCategory];

  // Clear existing series data and create series for selected category
  options.series = [
    {
      name: 'Total',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Positive',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Neutral',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Negative',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: selectedCategory,
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    }
  ];

  // Update chart
  myChart.setOption(options);
});

// Get smaller categories checkboxes
const smallerCategoriesCheckboxes = document.querySelectorAll('#categories input[type="checkbox"]');

// Handle smaller categories checkboxes change
smallerCategoriesCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    // Get selected side-by-side categories from checkboxes
    const selectedSideBySide = Array.from(smallerCategoriesCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    // Get selected main category from main category dropdown
    const selectedMainCategory = pageSelect.value;

    // Update chart with selected main and side-by-side categories
    updateChart(selectedMainCategory, selectedSideBySide);
  });
});

// Handle window resize
window.addEventListener('resize', myChart.resize);

// Define the updateChart function
function updateChart(mainCategory, sideBySideCategories) {
  // Clear selectedCategories array
  selectedCategories = [];

  // Clear existing series data for previous main category
  options.series = options.series.slice(0, 4); // Keep only the first four series

  // Update xAxis data
  options.xAxis.data = [mainCategory, ...sideBySideCategories];

  // Clear existing series data and create series for selected categories
  options.series = [
    {
      name: 'Total',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Positive',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Neutral',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: 'Negative',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    },
    {
      name: mainCategory,
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    }
  ];

  // Update legend data
  options.legend.data = ['Total', 'Positive', 'Neutral', 'Negative'];

  // Add side-by-side categories to selectedCategories array
  selectedCategories.push(...sideBySideCategories);

  // Add new series for selected categories
  selectedCategories.forEach((category) => {
    options.series.push({
      name: category,
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [] // Initial empty data
    });
  });

  // Update chart
  myChart.setOption(options);
}

// Get the "To Top" button element
const toTopButton = document.getElementById('toTop');

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
    // If the user has scrolled down at least 200 pixels, show the button
    if (window.scrollY >= 200) {
        toTopButton.style.display = 'block';
    } else {
        toTopButton.style.display = 'none';
    }
});
