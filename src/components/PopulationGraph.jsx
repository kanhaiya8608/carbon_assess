import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function PopulationGraph() {
  const [populationData, setPopulationData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then(response => {
        const populationData = response.data.data;
        populationData.sort((a, b) => a.Year - b.Year);
        setPopulationData(populationData);
      })
      .catch(error => {
        console.error('Error fetching population data:', error);
      });
  }, []);

  useEffect(() => {
    if (populationData.length > 0) {
      createChart();
    }
  }, [populationData]);

  const createChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    const ctx = document.getElementById('population-chart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: populationData.map(data => data.Year),
        datasets: [{
          label: 'Population',
          data: populationData.map(data => data.Population),
          backgroundColor: 'brown',
          borderColor: 'green',
          borderWidth: 2
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year',
              color: 'white',
              font: {
                weight: 'bold'
              }
            },
            ticks: {
              color: 'white'
            },
            grid: {
              display: false // Hide vertical grid lines for x-axis
            }
          },
          y: {
            title: {
              display: true,
              text: 'Population',
              color: 'white',
              font: {
                weight: 'bold'
              }
            },
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)' // Color of vertical grid lines for y-axis
            }
          }
        }
      }
    });
  };
  return (
    <div className= 'bg-gray-800 p-4 pb-8 rounded-md w-full h-96 mb-2'>
      <h2 className="folt-bolder text-xl text-white">Population Graph</h2>
      <canvas  id="population-chart"></canvas>
    </div>
  );
}

export default PopulationGraph;
