
var socket;

const ctx = document.getElementById('myChart');
var connected = false;
var chartObject = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Voters',
        data: [],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
var chart = new Chart(ctx, chartObject);
function connect() 
{
    socket = io('ws://localhost:8080');
    // Listen for messages
    

  socket.on('message', data => {
        var incomingData = JSON.parse(data)


            console.log('Data from server ', data);
            chart.data.labels.push(String(incomingData.Label))
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(incomingData.Data);
            });
            chart.update();
});

}

document.getElementById('open').onclick = () => {
    console.log("Opening Socket");
    connect();

}

document.getElementById('send').onclick = () => {
    console.log("Sending Data");
    const Label = document.getElementById('label').value;
    const Data = document.getElementById('data').value;
    var data = 
    {
        TimeStamp: Date.now(),
        Label: Label,
        Data: Data
    }
    socket.emit('message',JSON.stringify(data));
    

}

document.getElementById('close').onclick = () => {
    console.log("Closing Socket");
    socket.disconnect();
}


// ChartsJS