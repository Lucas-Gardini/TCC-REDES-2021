<template>
	<!-- SLOGAN -->
	<div :class="isMobile ? 'introduction mobile' : 'introduction'">
		<div style="display: flex; flex-direction: column; margin: auto; text-align: center">
			<h1>A sua dor de cabeça acaba agora!</h1>
			<h2>Se torne produtivo com <span>ORDERIFY</span></h2>
			<!-- <div style="margin-left: auto; margin-right: auto">
				<it-button type="neutral" icon="email" :size="isMobile ? 'small' : 'big'">Contato</it-button>
			</div> -->
		</div>
	</div>
	<!-- CONTENT -->
	<div class="content"></div>
</template>

<script>
export default {
	props: {
		isMobile: Boolean,
	},
};
</script>

<style scoped>
.introduction {
	/* aspect-ratio: 960/540; */
	background-image: url(../assets/home/svgBlackBackground.svg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	padding-top: 10vh;
	padding-bottom: 10vh;
	min-height: 50vh;
	color: #fff;
}
.introduction div h1 {
	transition: all 1s;
	font-size: 2em !important;
}
.introduction.mobile div h1 {
	transition: all 1s;
	font-size: 1.3em !important;
}
.introduction div h2 {
	transition: all 1s;
	font-size: 1.5em !important;
}
.introduction.mobile div h2 {
	transition: all 1s;
	font-size: 0.9em !important;
}

.content {
	/* aspect-ratio: 960/540; */
	background-image: url(../assets/home/svgBlackBackgroundContinuation.svg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	padding-top: 10vh;
	padding-bottom: 10vh;
	min-height: 50vh;
	color: #fff;
}
</style>
