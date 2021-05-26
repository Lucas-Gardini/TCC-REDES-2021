<template>
	<div class="blob-container">
		<div :class="`blob ${colors[color]}`"></div>
	</div>
</template>

<script>
export default {
	name: "PulsatingDots",
	props: {
		color: {
			type: String,
			required: false,
			default: "default",
		},
	},
	data() {
		return {
			colors: {
				default: "",
				white: "white",
				red: "red",
				orange: "orange",
				yellow: "yellow",
				blue: "blue",
				green: "green",
				purple: "purple",
			},
		};
	},
};
</script>

<style>
.blob-container {
	display: flex;
}

.blob {
	margin: auto;
	background: black;
	border-radius: 50%;
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
	height: 10px;
	width: 10px;
	transform: scale(1);
	animation: pulse-black 2s infinite;
	opacity: 0.75;
}

@keyframes pulse-black {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}

.blob.white {
	background: white;
	box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
	animation: pulse-white 2s infinite;
}

@keyframes pulse-white {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
	}
}

.blob.red {
	background: rgb(255, 82, 82);
	box-shadow: 0 0 0 0 rgb(255, 82, 82);
	animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgb(255, 82, 82, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
	}
}

.blob.orange {
	background: rgba(255, 121, 63, 1);
	box-shadow: 0 0 0 0 rgba(255, 121, 63, 1);
	animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(255, 121, 63, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 121, 63, 0);
	}
}

.blob.yellow {
	background: rgba(255, 177, 66, 1);
	box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
	animation: pulse-yellow 2s infinite;
}

@keyframes pulse-yellow {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 177, 66, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(255, 177, 66, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 177, 66, 0);
	}
}

.blob.blue {
	background: rgba(52, 172, 224, 1);
	box-shadow: 0 0 0 0 rgba(52, 172, 224, 1);
	animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(52, 172, 224, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
	}
}

.blob.green {
	background: #00b74a;
	box-shadow: 0 0 0 0 rgb(0, 183, 74);
	animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 183, 74, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
	}
}

.blob.purple {
	background: #b23cfd;
	box-shadow: 0 0 0 0 #b23cfd;
	animation: pulse-purple 2s infinite;
}

@keyframes pulse-purple {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(178, 60, 253, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(142, 68, 173, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(142, 68, 173, 0);
	}
}
</style>
