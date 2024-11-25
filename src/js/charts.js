export default function renderChartsPage() {
  function generateAugustDates() {
    const year = new Date().getFullYear(); // Get the current year
    const augustDates = [];

    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, 7, day); // Month is 0-indexed, so 7 is August
      const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      augustDates.push(formattedDate); // Add the formatted date to the array
    }

    return augustDates;
  }

  function generateRandomData() {
    const randomData = [];
    for (let i = 0; i < 31; i++) { // 31 days in August
      const randomValue = Math.random() * (1 - 0.1) + 0.1; // Random value between 0.1 and 1
      randomData.push(randomValue);
    }
    return randomData;
  }

  const xValues = generateAugustDates();

  const html = `
    <h1>CHARTS</h1>
    <div id="carousel" style="display: flex; overflow-x: auto; margin-bottom: 20px;"></div>
    <canvas id="myChart" style="width:100%; height:400px;"></canvas>
  `;

  function createCarousel(values) {
    const carousel = document.getElementById('carousel');

    values.forEach((date, index) => {
      const dayMark = document.createElement('div');
      dayMark.textContent = date;
      dayMark.style.margin = '0 10px';
      dayMark.style.cursor = 'pointer';
      dayMark.style.padding = '5px';
      dayMark.style.backgroundColor = '#f0f0f0';
      dayMark.style.borderRadius = '5px';

      dayMark.addEventListener('click', function() {
        highlightPointOnChart(index);
      });

      carousel.appendChild(dayMark);
    });
  }

  function highlightPointOnChart(dayIndex) {
    chart.data.datasets.forEach((dataset) => {
      dataset.pointRadius = dataset.data.map(() => 3); // Reset to normal size
      dataset.pointBackgroundColor = dataset.data.map(() => "blue"); // Reset to normal color
    });

    chart.data.datasets.forEach((dataset) => {
      dataset.pointRadius[dayIndex] = 12; // Increase size for the selected point
      dataset.pointBackgroundColor[dayIndex] = "red"; // Change color to red
    });

    chart.data.datasets.map((dataset, datasetIndex) => {
      const value = dataset.data[dayIndex];
      console.log(`Dataset ${datasetIndex + 1}, Day ${xValues[dayIndex]}: ${value}`);
      return value;
    });

    chart.update();
  }
  let chart;

  setTimeout(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    if (ctx) {
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            lineTension: 0,
            data: generateRandomData(),
            borderColor: "red",
            fill: false,
            pointRadius: 3
          }, {
            lineTension: 0,
            data: generateRandomData(),
            borderColor: "blue",
            fill: false,
            pointRadius: 3
          }]
        },
        options: {
          legend: {display: true}
        }
      });
      createCarousel(xValues);
    } else {
      console.error("Failed to get canvas context");
    }
  }, 0);

  return html;
}
