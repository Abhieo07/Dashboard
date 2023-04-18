document.addEventListener("DOMContentLoaded", () => {
  // Get the chart canvas and filter form
 
  const chartCanvas = document.getElementById("sector");
  const topicCanvas = document.getElementById("topic");
  const myChart = document.getElementById("myChart");
  const region = document.getElementById("region");
  const filterForm = document.getElementById("filter-form");
  const list = document.getElementById('list')
  // Initialize Chart.js chart
  function init(can,type,label) {
    const chart = new Chart(can, {
      type: type,
      data: {
        labels: null,
        datasets: [
          {
            label: label,
            data: null,
            backgroundColor: [
            'rgba(255, 99, 132,1)',
            'rgba(54, 162, 235,1)',
            'rgba(255, 205, 86,1)',
            'rgba(155, 99, 132,1)',
            'rgba(94, 162, 235,1)',
            'rgba(155, 205, 86,1)',
            'rgba(255, 255, 132,1)',
            'rgba(54, 54, 235,1)',
            'rgba(255, 255, 86,1)',
            'rgba(155, 155, 132,1)',
            'rgba(94, 94, 235,1)',
            'rgba(155, 155, 86,1)',
            'rgba(255, 99, 99,1)',
            'rgba(54, 162, 54,1)',
            'rgba(255, 205, 255,1)',
            'rgba(155, 99, 152,1)',
            'rgba(94, 162, 94,1)',
            'rgba(155, 205, 156,1)',
            'rgba(255, 255, 232,1)'
            ],
            hoverOffset: 4,
        
            borderColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: label
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    return chart
  }
  let url = ''
  const chart = init(chartCanvas,'bar','Volume')
  const pie = init(topicCanvas,'pie','#volume over topic')
  const reg = init(region,'line','#volume over region')

  const line = new Chart(myChart, {
    type: 'line',
    data: {
      labels: null,
      datasets: [
        {
        label: 'Intensity',
        backgroundColor: 'rgba(0, 102, 204,1)',
        borderColor: 'rgba(0, 102, 204,0.2)',
        fill: true,
        data: null
        },
        {
        label: 'Relevence',
        backgroundColor: 'rgba(0, 204, 255,1)',
        borderColor: 'rgba(0, 204, 255,0.2)',
        fill: true,
        data: null
        },
        {
        label: 'Impact',
        backgroundColor: 'rgba(0, 102, 153,1)',
        borderColor: 'rgba(0, 102, 153,0.2)',
        fill: true,
        data: null
        },
        {
        label: 'Likelihood',
        backgroundColor: 'rgba(51, 204, 204,1)',
        borderColor: 'rgba(51, 204, 204,0.2)',
        fill: true,
        data: null
        }
    ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) => 'intensity/relevance/impact/likelihood by volume over impact '
        },
        tooltip: {
          mode: 'index'
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Points'
          }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Volume'
          }
        }
      }
    }
  });

 // Define function to fetch data from API and update chart

  const updateTopic = () => {
    const Volume = {}
    fetch(url)
  
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((res) => res.topic);
        
        labels.forEach(ele => {
          Volume[ele]=Volume[ele] + 1 || 1
        });
        pie.data.labels = Object.keys(Volume);
        pie.data.datasets[0].data = Object.values(Volume);
        pie.update();
      });
  }
  const updateSector = () =>{
    const Volume = {}
    fetch(url)
    
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((movie) => movie.sector);
        
        labels.forEach(ele => {
          Volume[ele]=Volume[ele] + 1 || 1
        });
        chart.data.labels = Object.keys(Volume);
        chart.data.datasets[0].data = Object.values(Volume);
        chart.update();
      })
  };

  const updateLine = () => {
    const Vol_i = {}
    const Vol_r = {}
    const Vol_im = {}
    const Vol_l = {}
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const Intensity = data.map((movie) => movie.intensity);
        const Relevence = data.map((movie) => movie.relevance);
        const Impact = data.map((movie) => movie.impact);
        const Likelihood = data.map((movie) => movie.impact);

        Intensity.forEach(ele => {
          Vol_i[ele]=Vol_i[ele] + 1 || 1
        });
        Relevence.forEach(ele => {
          Vol_r[ele]=Vol_r[ele] + 1 || 1
        });
        Impact.forEach(ele => {
          Vol_im[ele]=Vol_im[ele] + 1 || 1
        });
        Likelihood.forEach(ele => {
          Vol_l[ele]=Vol_l[ele] + 1 || 1
        });

        line.data.labels = Object.keys(Vol_im);
        line.data.datasets[0].data = Object.values(Vol_i);
        line.data.datasets[1].data = Object.values(Vol_r);
        line.data.datasets[2].data = Object.values(Vol_im);
        line.data.datasets[3].data = Object.values(Vol_l);
        line.update();
      });
  };

  const updateRegion = () =>{
    const Volume = {}
    fetch(url)
    
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((movie) => movie.region);
        
        labels.forEach(ele => {
          Volume[ele]=Volume[ele] + 1 || 1
        });
        
        reg.data.labels = Object.keys(Volume);
        reg.data.datasets[0].data = Object.values(Volume);
        reg.update();
      })
  };

  const updateMap = () => {
    const Volume = {}
    const country_array = []
    fetch(url)
      .then((response) => response.json())
      .then((data)=>{
        const countries = data.map((res) => res.country);
        countries.forEach(ele => {
          Volume[ele] = Volume[ele] + 1 || 1
        });
        for(const key in Volume) {
          if (Volume.hasOwnProperty(key)) {
            country_array.push( [ key, Volume[key] ] );
          }
        }
        country_array.unshift(['country','volume'])
        google.charts.load('current', {
          'packages':['geochart'],
          });
          google.charts.setOnLoadCallback(drawRegionsMap);
      
          function drawRegionsMap() {
          var data = google.visualization.arrayToDataTable(country_array);
      
          var options = {
              colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
              datalessRegionColor: '#f8bbd0',
              defaultColor: '#f5f5f5',
          };
      
          var chart = new google.visualization.GeoChart(document.getElementById('map'));
      
          chart.draw(data, options);
          }
      })
  }
  updateMap()
  // Call updateChart function initially to display default data
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateChart();
  });

  const clear = document.querySelector('#clear').addEventListener('click',()=>{
    filterForm.reset()
  })
  
  function updateChart() {
    const serch = document.getElementById('end_year').value
    const topic = document.getElementById('filter_topic').value
    const sector = document.getElementById('filter_sector').value
    const region = document.getElementById('filter_region').value
    const pestle = document.getElementById('filter_pestle').value
    const source = document.getElementById('filter_source').value
    const country = document.getElementById('filter_country').value
    url = `/dashboard/?end_year=${serch}&topic=${topic}&sector=${sector}&region=${region}&pestle=${pestle}&source=${source}&country=${country}`
    updateSector()
    updateTopic()
    updateLine()
    updateRegion()
    updateMap()

  }
  updateChart();
  
});