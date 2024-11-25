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
    <div id="customLegend"></div>
    <div id="carouselContainer">
      <button id="carouselPrev">&#8592;</button>
      <div id="carousel">
        <div id="carouselItems"></div>
      </div>
      <button id="carouselNext">&#8594;</button>
    </div>
    <canvas id="myChart"></canvas>
  `;

  const visibleItems = 6; // Number of visible items
  let currentStartIndex = 0; // Track the first visible item

  function initializeCarousel() {
    const carouselItemsContainer = document.getElementById("carouselItems");

    xValues.forEach((date, index) => {
      const dayElement = document.createElement("div");
      dayElement.textContent = date;

      dayElement.addEventListener("click", () => {
        highlightPointOnChart(index);
      });

      carouselItemsContainer.appendChild(dayElement);
    });

    document.getElementById("carouselPrev").addEventListener("click", () => {
      slideCarousel(-1);
    });

    document.getElementById("carouselNext").addEventListener("click", () => {
      slideCarousel(1);
    });
  }

  function slideCarousel(direction) {
    const totalItems = xValues.length;
    const carouselItemsContainer = document.getElementById("carouselItems");
    const itemWidth = 110; // Width + margin of each item (50px + 2*5px margin)

    currentStartIndex += direction * visibleItems;

    if (currentStartIndex < 0) currentStartIndex = 0;
    if (currentStartIndex > totalItems - visibleItems)
      currentStartIndex = totalItems - visibleItems;

    const translateX = -currentStartIndex * itemWidth;
    carouselItemsContainer.style.transform = `translateX(${translateX}px)`;
  }

  function updateCustomLegend(dayIndex) {
    const legendContainer = document.getElementById("customLegend");
    legendContainer.innerHTML = ""; // Clear previous legend

    chart.data.datasets.forEach((dataset, index) => {
      const chartValueBlock = document.createElement("div");
      chartValueBlock.style.gridArea = `value${index + 1}`;
      chartValueBlock.style.marginBottom = "10px";

      const chartTitle = document.createElement("div");
      chartTitle.className = "chartTitle"
      chartTitle.textContent = `Chart ${index + 1}`; // Name each chart
      chartTitle.style.gridArea = `chart${index + 1}`;
      legendContainer.appendChild(chartTitle);

      const chartValue = document.createElement("div");
      chartValue.className = "chartValue"
      chartValue.textContent = `${(dataset.data[dayIndex] * 100).toFixed(0)} GB`;
      chartValue.style.color = dataset.borderColor; // Match the graph color

      chartValueBlock.appendChild(chartValue);
      legendContainer.appendChild(chartValueBlock);
    });
  }

  function highlightPointOnChart(dayIndex) {
    chart.data.datasets.forEach((dataset) => {
      dataset.pointRadius = dataset.data.map(() => 3); // Reset to normal size
      dataset.pointBackgroundColor = dataset.data.map(() => "rgb(77 106 173)"); // Reset to normal color

      const value = dataset.data[dayIndex];
      dataset.label = value.toFixed(2);
    });

    chart.data.datasets.forEach((dataset) => {
      dataset.pointRadius[dayIndex] = 12; // Increase size for the selected point
      dataset.pointBackgroundColor[dayIndex] = "rgb(192 28 31)"; // Change color to red
    });

    chart.update();
    updateCustomLegend(dayIndex);
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
            label: 1,
            lineTension: 0,
            data: generateRandomData(),
            borderColor: "rgb(192 28 31)",
            fill: false,
            pointRadius: 3
          }, {
            label: 2,
            lineTension: 0,
            data: generateRandomData(),
            borderColor: "rgb(77 106 173)",
            fill: false,
            pointRadius: 3
          }]
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{ gridLines: {
              drawOnChartArea: false,
              drawBorder: true,
            }}],
            yAxes: [{
              ticks: { min: 0, max: 1 },
              gridLines: {
                drawOnChartArea: false,
                drawBorder: true,
              }
            }]
          },
        }
      });
      initializeCarousel();
    } else {
      console.error("Failed to get canvas context");
    }
  }, 0);

  return html;
}
