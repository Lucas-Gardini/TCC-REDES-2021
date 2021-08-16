<template>
	<div class="title">
		<h1
			:class="animateTitle ? 'animate__animated animate__rubberBand' : ''"
			style="display: flex; color: #fff; letter-spacing: 8px !important"
		>
			ORDERIFY
		</h1>
	</div>
</template>

<script>
export default {
	name: "Title",
	data() {
		return {
			animateTitle: false,
		};
	},
	mounted() {
		setInterval(() => {
			this.animateTitle = !this.animateTitle;
		}, 1350);
	},
};
</script>

<style scoped>
.title {
	position: relative;
	min-width: 100%;
	display: grid;
	place-items: center;
	margin-left: 0px;
	background: url(https://cdn.discordapp.com/attachments/865255265774469122/876887430731530280/o.jpg) 100%
		100%;
}

.title h1 {
	text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
	font-size: 2em;
	padding: 20px;
}
@media screen and (min-width: 768px) {
	.title h1 {
		font-size: 5em;
		padding: 50px;
	}
}
</style>
