<template>
	{{ timeAgo }}
</template>

<script>
import moment from "moment";
export default {
	props: {
		date: String,
	},
	data() {
		return {
			interval: null,
			timeAgo: "",
		};
	},
	mounted() {
		this.convertDate();
		this.intervalDate();
	},
	watch: {
		date() {
			this.intervalDate();
		},
	},
	methods: {
		intervalDate() {
			clearInterval(this.interval);
			this.interval = setInterval(() => {
				this.convertDate();
			}, 10000);
		},
		convertDate() {
			let [days, hours, minutes, seconds] = [
				moment().diff(this.date, "days"),
				moment().diff(this.date, "hours"),
				moment().diff(this.date, "minutes"),
				moment().diff(this.date, "seconds"),
			];
			let returningTime = `${
				moment().diff(this.date, "hours") > 24
					? `${days} dia${days > 1 ? "s" : ""}`
					: hours > 0 && hours < 24
					? `${hours} ${hours > 1 ? `horas` : `hora`} `
					: minutes > 0
					? `${minutes} ${minutes > 1 ? `minutos` : `minutos`} `
					: `${seconds} ${seconds > 1 ? `segundos` : `segundo`}  `
			} atrás`;
			if (
				returningTime.includes("0") &&
				returningTime.includes("segundo") &&
				!returningTime.includes("segundos")
			) {
				this.timeAgo = "Agora";
				return;
			}
			this.timeAgo = returningTime;
		},
	},
};
</script>

<style></style>
