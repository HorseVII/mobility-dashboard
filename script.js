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
var map = L.map('campus-map').setView([51.4518, 5.4800], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Map circles (purple-themed)
var spots = [
  {lat:51.451655, lng:5.480791, color:'#a569bd'},  // purple
  {lat:51.452479, lng:5.479168, color:'#8e44ad'},
  {lat:51.451070, lng:5.482189, color:'#bb8fce'},
  {lat:51.451769, lng:5.478253, color:'#d2b4de'}
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

// Random occupancy 40%-100%
function generateRandomData(){
  let data = [];
  for(let i=0; i<labels.length; i++){
    data.push(Math.floor(Math.random()*61)+40);
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
      backgroundColor: 'rgba(155, 89, 182, 0.6)',
      borderColor: 'rgba(155, 89, 182, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive:true,
    plugins: { legend:{ display:true, position:'top' } },
    scales: {
      y:{ beginAtZero:true, max:100, title:{ display:true, text:'% Occupancy' } },
      x:{ title:{ display:true, text:'Time of Day' } }
    }
  }
});

// ----- Live Update Every 5 Seconds -----
setInterval(function(){
  var newData = generateRandomData();
  occupancyChart.data.datasets[0].data = newData;
  occupancyChart.update();

  // Update four prediction blocks
  document.getElementById('slot1').textContent = newData[0] + '%';
  document.getElementById('slot2').textContent = newData[2] + '%';
  document.getElementById('slot3').textContent = newData[4] + '%';
  document.getElementById('slot4').textContent = newData[7] + '%';
}, 5000);
