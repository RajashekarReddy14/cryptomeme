import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, multiAxis }) {

  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
      tooltip: {
        enabled: false, 
        external: function(context) {
          const tooltipModel = context.tooltip;
          const chart = context.chart;
          const canvas = chart.canvas;

          const existingTooltip = document.getElementById('chartjs-custom-tooltip');
          if (existingTooltip) {
            existingTooltip.remove();
          }

          const tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-custom-tooltip';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          tooltipEl.style.color = 'white';
          tooltipEl.style.padding = '10px';
          tooltipEl.style.borderRadius = '5px';
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.transform = 'translateY(-50%)';
          tooltipEl.style.transition = 'opacity 0.2s ease';

          if (tooltipModel.body) {
            const titleLines = tooltipModel.title || [];
            const bodyLines = tooltipModel.body.map(item => item.lines);

            let innerHtml = '<div>';
            bodyLines.forEach(body => {
              innerHtml += `<div>${body}</div>`;
            });
            innerHtml += '</div>';

            tooltipEl.innerHTML = innerHtml;
          }

          canvas.parentNode.appendChild(tooltipEl);

          const positionY = canvas.offsetTop + tooltipModel.caretY;
          const positionX = canvas.offsetLeft + chart.width;

          tooltipEl.style.left = `${positionX + 10}px`; // 10px padding to the right
          tooltipEl.style.top = `${positionY}px`;
        }
      }
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          display: false, 
        },
      },
      y: {
        display: false, 
        ticks: {
          display: false, 
        },
      },
      crypto1: {
        position: "left",
        display: false,
      },
      crypto2: multiAxis && {
        position: "right",
        display: false,
      },
    },
    elements: {
      line: {
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 12,
      },
    }
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
