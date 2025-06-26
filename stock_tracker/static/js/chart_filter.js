// async function updateChart(ticker, period) {
//   const response = await fetch(`/chart_data?ticker=${ticker}&period=${period}`);
//   const data = await response.json();

//   const trace = {
//     x: data.dates,
//     y: data.prices,
//     type: 'scatter',
//     mode: 'lines',
//     name: 'Close Price'
//   };

//   const layout = {
//     title: `${ticker} - ${period} Trend`,
//     xaxis: { title: 'Date' },
//     yaxis: { title: 'Price' },
//     annotations: [{
//       text: `Open: ₹${data.open} | High: ₹${data.high} | Low: ₹${data.low}`,
//       xref: 'paper',
//       yref: 'paper',
//       x: 0.99,
//       y: 0.99,
//       showarrow: false,
//       align: 'right',
//       bordercolor: 'black',
//       borderwidth: 1,
//       borderpad: 8,
//       bgcolor: 'white',
//       opacity: 0.9
//     }]
//   };

//   Plotly.newPlot('chart-container', [trace], layout);
// }

  