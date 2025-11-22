
function updateTime() {
  const t = new Date();
  document.getElementById('time').textContent =
    t.getHours().toString().padStart(2,'0') + ':' +
    t.getMinutes().toString().padStart(2,'0');
}
setInterval(updateTime, 1000);
updateTime();
