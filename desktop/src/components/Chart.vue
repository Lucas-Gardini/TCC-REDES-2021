<template>
	<div style="width: 400px">
		<BarChart v-bind="barChartProps" />
	</div>
</template>

<script>
import { ref } from "vue";
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
	},
	setup(props) {
		const toggleLegend = ref(true);
		const chartData = {
			labels: [...props.labels],
			datasets: [...props.datasets],
		};

		const footer = (hoveredItem) => {
			return (
				"Renda: " +
				props.moneys[hoveredItem[0].dataIndex].toLocaleString("pt-br", {
					style: "currency",
					currency: "BRL",
				})
			);
		};

		const options = {
			scales: {
				myScale: {
					type: "logarithmic",
					position: toggleLegend.value ? "left" : "right",
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						footer: footer,
					},
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
