import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const Chartjs = ({ percentajes }) => {
    const { bone_mass, fat_mass, muscle_mass, residual_mass } = percentajes;
    const chartRef = useRef(null);
    let myChart = null;

    // Este efecto se ejecuta cuando cambian los percentajes
    useEffect(() => {
        if (chartRef.current) {
            // Destruir la gráfica existente si ya existe
            if (myChart) {
                myChart.destroy();
            }

            // Crear una nueva gráfica con los percentajes actualizados
            myChart = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: ['Masa Ósea', 'Masa Grasa', 'Masa Muscular', 'Masa Residual'],
                    datasets: [{
                        data: [bone_mass, fat_mass, muscle_mass, residual_mass],
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
    }, [bone_mass, fat_mass, muscle_mass, residual_mass]);

    return (
        <div style={{ width: '100%', height: 'auto', backgroundColor: 'primary' }}>
            <h1>Gráfica de Pastel</h1>
            <canvas ref={chartRef} id="pieChart"></canvas>
        </div>
    );
};
