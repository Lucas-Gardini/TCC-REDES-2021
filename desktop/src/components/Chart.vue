<template>
	<BarChart v-if="chartType === 'bar'" :chartData="chartData" />
	<LineChart v-if="chartType === 'line'" :chartData="chartData" />
	<DoughnutChart v-if="chartType === 'dough'" :chartData="chartData" />
	<PieChart v-if="chartType === 'pie'" :chartData="chartData" />
</template>

<script>
import { defineComponent } from "vue";
import { BarChart, LineChart, DoughnutChart, PieChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default defineComponent({
	name: "Home",
	components: { BarChart, LineChart, DoughnutChart, PieChart },
	props: {
		chartData: {
			type: Object,
		},
		chartType: {
			type: String,
			default: "bar",
		},
	},
});
</script>
