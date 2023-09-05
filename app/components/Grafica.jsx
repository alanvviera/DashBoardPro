import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const Grafica = ({ porcentajes }) => {
    const { masa_osea, masa_grasa, masa_muscular, masa_residual } = porcentajes;
    const chartRef = useRef(null);
    let myChart = null;

    // Este efecto se ejecuta cuando cambian los porcentajes
    useEffect(() => {
        if (chartRef.current) {
            // Destruir la gráfica existente si ya existe
            if (myChart) {
                myChart.destroy();
            }

            // Crear una nueva gráfica con los porcentajes actualizados
            myChart = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: ['Masa Ósea', 'Masa Grasa', 'Masa Muscular', 'Masa Residual'],
                    datasets: [{
                        data: [masa_osea, masa_grasa, masa_muscular, masa_residual],
                        backgroundColor: ['red', 'blue', 'yellow', 'green'],
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        // Asegurarse de que la gráfica se destruya cuando el componente se desmonte
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [masa_osea, masa_grasa, masa_muscular, masa_residual]);

    return (
        <div style={{ width: '100%', height: 'auto', backgroundColor: 'primary' }}>
            <h1>Gráfica de Pastel</h1>
            <canvas ref={chartRef} id="pieChart"></canvas>
        </div>
    );
};
