// ----- Update Time Widget -----
function updateTime() {
  const t = new Date();
  document.getElementById('time').textContent =
    t.getHours().toString().padStart(2,'0') + ':' +
    t.getMinutes().toString().padStart(2,'0');
}
setInterval(updateTime, 1000);
updateTime();

// ----- Leaflet Map -----
var map = L.map('campus-map').setView([51.4413, 5.4697], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var spots = [
  {lat:51.4418, lng:5.4705, color:'red'},
  {lat:51.4410, lng:5.4685, color:'green'},
  {lat:51.4420, lng:5.4710, color:'orange'},
  {lat:51.4405, lng:5.4690, color:'yellow'}
];

spots.forEach(s => {
  L.circle([s.lat, s.lng], {
    color: s.color,
    fillColor: s.color,
    fillOpacity: 0.5,
    radius: 20
  }).addTo(map);
});

// ----- Parking Occupancy Bar Chart -----
var ctx = document.getElementById('busyness-chart').getContext('2d');
var labels = [];
for(let h=8; h<=17; h++){ labels.push(h + ':00'); }

function generateRandomData(){
  let data = [];
  for(let i=0;i<labels.length;i++){
    data.push(Math.floor(Math.random()*101));
  }
  return data;
}

var occupancyChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: '% Occupancy',
      data: generateRandomData(),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive:true,
    plugins: {
      legend: { display: true, position: 'top' }
    },
    scales: {
      y: { beginAtZero:true, max:100, title: { display:true, text: '% Occupancy' } },
      x: { title: { display:true, text: 'Time of Day' } }
    }
  }
});

// ----- Live Update Every 5 Seconds -----
setInterval(function(){
  var newData = generateRandomData();
  occupancyChart.data.datasets[0].data = newData;
  occupancyChart.update();

  // Update the four parking time blocks dynamically
  document.getElementById('slot1').textContent = newData[0] + '%';
  document.getElementById('slot2').textContent = newData[2] + '%';
  document.getElementById('slot3').textContent = newData[4] + '%';
  document.getElementById('slot4').textContent = newData[7] + '%';
}, 5000);
