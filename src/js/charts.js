export default function renderChartsPage() {
  function generateAugustDates() {
    const year = new Date().getFullYear(); // Get the current year
    const augustDates = [];

    // Loop through the days of August (1 to 31)
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

  // Return the HTML with the canvas element
  const html = `
    <h1>CHARTS</h1>
    <canvas id="myChart" style="width:100%; height:400px;"></canvas>
  `;

  // Use setTimeout to initialize the chart after the HTML is rendered
  setTimeout(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            lineTension: 0,
            data: generateRandomData(),
            borderColor: "red",
            fill: false
          }, {
            lineTension: 0,
            data: generateRandomData(),
            borderColor: "blue",
            fill: false
          }]
        },
        options: {
          legend: {display: true}
        }
      });
    } else {
      console.error("Failed to get canvas context");
    }
  }, 0);

  return html;
}
