<template>
	<div style="width: 100%">
		<BarChart v-bind="barChartProps" />
	</div>
</template>

<script>
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
	name: "Chart",
	components: { BarChart },
	props: {
		labels: {
			type: Array,
			required: true,
		},
		datasets: {
			type: Array,
			required: true,
		},
		moneys: {
			type: Array,
			required: true,
		},
		showQuantity: {
			type: Boolean,
			default: true,
			required: true,
		},
	},
	setup(props) {
		const chartData = {
			labels: [...props.labels],
			datasets: [...props.datasets],
		};

		const footer = (hoveredItem) => {
			return props.showQuantity
				? "Renda: " +
						props.moneys[hoveredItem[0].dataIndex].toLocaleString("pt-br", {
							style: "currency",
							currency: "BRL",
						})
				: "Quantidade: " + props.moneys[hoveredItem[0].dataIndex];
		};

		const options = {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						footer: footer,
					},
				},
				decimation: {
					enabled: false,
				},
			},
		};

		const { barChartProps, barChartRef } = useBarChart({
			chartData,
			options,
		});

		return {
			options,
			barChartRef,
			barChartProps,
		};
	},
};
</script>
