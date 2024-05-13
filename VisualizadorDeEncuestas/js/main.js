document.addEventListener("DOMContentLoaded", function() {
    fetch('data/encuesta.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('encuesta-data');
            const labels = ['Centro', 'Grado', 'Sexo', 'Edad', 'Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5'];
            const rows = data.map(item => {
                const row = document.createElement('tr');
                labels.forEach(label => {
                    const cell = document.createElement('td');
                    cell.textContent = item[label];
                    row.appendChild(cell);
                });
                return row;
            });
            rows.forEach(row => {
                row.classList.add('animate__animated', 'animate__fadeIn');
                row.addEventListener('click', () => {
                    alert('Has hecho clic en una fila');
                });
                tableBody.appendChild(row);
            });

            // Crear gráfico por centro
            createDoughnutChart('Centro', data.map(item => item['Centro']), 'chart-centro');

            // Crear gráfico por grado
            createDoughnutChart('Grado', data.map(item => item['Grado']), 'chart-grado');

            // Crear gráfico por sexo
            createDoughnutChart('Sexo', data.map(item => item['Sexo']), 'chart-sexo');

            // Crear gráfico por edad
            createDoughnutChart('Edad', data.map(item => item['Edad']), 'chart-edad');
        });
});

function createDoughnutChart(label, data, canvasId) {
    const uniqueValues = [...new Set(data)];
    const valueCounts = uniqueValues.map(value => data.filter(item => item === value).length);

    const ctx = document.getElementById(canvasId).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: uniqueValues,
            datasets: [{
                label: `Distribución por ${label}`,
                data: valueCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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
    });
}
