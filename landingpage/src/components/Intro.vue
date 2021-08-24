<template>
	<!-- SLOGAN -->
	<div :class="isMobile ? 'introduction mobile' : 'introduction'">
		<div style="display: flex; flex-direction: column; margin: auto; text-align: center">
			<h1>A sua dor de cabeça acaba agora!</h1>
			<h2>Se torne produtivo com <span>ORDERIFY</span></h2>
			<div style="padding-top: 20px">
				Progresso do projeto
				<it-progressbar color="success" :progress="45" :show-tooltip="false" />
			</div>
		</div>
	</div>
	<!-- CONTENT -->
	<div class="content">
		<div class="header">
			<div class="divider1" style="text-align: center">
				<hr style="margin-top: auto; margin-bottom: auto; width: 100%" />
			</div>
			<h1 class="title" style="text-align: center">Estrutura do Projeto</h1>
			<div class="divider2" style="text-align: center">
				<hr style="margin-top: auto; margin-bottom: auto; width: 100%" />
			</div>
		</div>
		<div class="a-little-bit-of-everything">
			<div class="item1">
				<it-icon class="item" color="#2FDE75" name="smartphone" />
				<p>App Mobile</p>
			</div>
			<div class="item2">
				<it-icon class="item" color="#2FDE75" name="computer" />
				<p>App Desktop</p>
			</div>
			<div class="item3">
				<it-icon class="item" color="#2FDE75" name="cloud" />
				<p>Servidor</p>
			</div>
		</div>
		<br />
		<div class="header">
			<div class="divider1" style="text-align: center">
				<hr style="margin-top: auto; margin-bottom: auto; width: 100%" />
			</div>
			<h1 class="title" style="text-align: center">Recursos que garantem qualidade e eficiência</h1>
			<div class="divider2" style="text-align: center">
				<hr style="margin-top: auto; margin-bottom: auto; width: 100%" />
			</div>
		</div>
		<div class="features">
			<div class="container feature1">
				<it-icon
					style="margin-left: auto; margin-right: auto; font-size: 2em"
					name="speed"
					color="#121212"
				/>
				<h1>Velocidade</h1>
				<p>Aplicativos leves que vão rodar bem em quase qualquer dispositivo!</p>
			</div>
			<div class="container feature2">
				<div>
					<it-icon
						style="margin-left: auto; margin-right: auto; font-size: 2em"
						name="smartphone"
						color="#121212"
					/>
					&nbsp;
					<it-icon
						style="margin-left: auto; margin-right: auto; font-size: 2em"
						name="computer"
						color="#121212"
					/>
				</div>
				<h1>Compatibilidade</h1>
				<p>Compatível com o máximo de dispositivos Windows, Linux e Android!</p>
			</div>
			<div class="container feature3">
				<it-icon
					style="margin-left: auto; margin-right: auto; font-size: 2em"
					name="accessibility_new"
					color="#121212"
				/>
				<h1>Acessibilidade</h1>
				<p>Uma aplicação acessível, fácil e simples de se usar!</p>
			</div>
		</div>
		<br />
		<div class="mobile">
			<div class="text">
				<h1>Aplicativo Mobile</h1>
				<h2>Anote pedidos de uma maneira nunca vista antes!</h2>
			</div>
			<div class="image">
				<img src="../assets/home/mobile.svg" style="margin: auto" />
			</div>
		</div>
	</div>
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
	background-image: url(../assets/home/HomeBackground.svg);
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

.header {
	display: grid;
	grid-template-columns: 15% auto 15%;
	grid-template-rows: auto;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	margin-bottom: 15px;
}
.header .divider1 {
	grid-area: 1 / 1 / 2 / 2;
	display: flex;
}
.header .title {
	grid-area: 1 / 2 / 2 / 3;
}
.header .divider2 {
	grid-area: 1 / 3 / 2 / 4;
	display: flex;
}

.content {
	/* aspect-ratio: 960/540; */
	background-image: url(../assets/home/svgBlackBackgroundContinuation.svg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;
	padding-top: 10vh;
	padding-bottom: 10vh;
	min-height: 50vh;
	color: #fff;
}

.content .a-little-bit-of-everything {
	width: 100%;
	display: grid;
	grid-template-columns: 33% auto 33%;
	grid-template-rows: auto;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
}
.content .a-little-bit-of-everything .item1 {
	grid-area: 1 / 1 / 2 / 2;
	text-align: center;
}
.content .a-little-bit-of-everything .item2 {
	grid-area: 1 / 2 / 2 / 3;
	text-align: center;
}
.content .a-little-bit-of-everything .item3 {
	grid-area: 1 / 3 / 2 / 4;
	text-align: center;
}

.item {
	transition: all 0.3s;
	padding: 50px;
	background-color: #fff;
	border-radius: 20%;
	font-size: 2em;
}
.item:hover {
	transition: all 0.3s;
	background-color: #2e2e2e;
	color: #2fde75 !important;
}

.content .features {
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: auto;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
}

.content .features .container {
	transition: all 0.5s;
	background-color: #fff;
	color: #121212;
	display: flex;
	flex-direction: column;
	text-align: center;
	-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.23);
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.23);
	padding-top: 10px;
	padding-bottom: 10px;
}

.content .features .container:hover {
	transition: all 0.5s;
	transform: scale(1.05);
	background-color: #fff;
	-webkit-box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.23);
	box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.23);
}

.content .features .container.feature1 {
	grid-area: 1 / 1 / 2 / 2;
	margin: 5px;
	padding: 10px;
}
.content .features .container.feature2 {
	grid-area: 1 / 2 / 2 / 3;
	margin: 5px;
	padding: 10px;
}
.content .features .container.feature3 {
	grid-area: 1 / 3 / 2 / 4;
	margin: 5px;
	padding: 10px;
}

@media screen and (max-width: 768px) {
	.item {
		transition: all 0.3s;
		padding: 30px;
		background-color: #fff;
		border-radius: 20%;
		font-size: 2em;
	}
	.content .mobile .text h1 {
		font-size: 2em;
	}
	.content .mobile .text h2 {
		font-size: 1em;
	}

	.content .features {
		display: flex;
		flex-direction: column;
	}

	.content .features .container {
		transition: all 0.5s;
		background-color: #fff;
		color: #121212;
		display: flex;
		flex-direction: column;
		text-align: center;
		-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.23);
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.23);
	}

	.content .features .container:hover {
		transition: all 0.5s;
		transform: scale(1.05);
		background-color: #fff;
		-webkit-box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.23);
		box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.23);
	}

	.content .features .container.feature1 {
		grid-area: 1 !important;
		margin: 10px !important;
		padding: 10px;
	}
	.content .features .container.feature2 {
		grid-area: 1 !important;
		margin: 10px !important;
		padding: 10px;
	}
	.content .features .container.feature3 {
		grid-area: 1 !important;
		margin: 10px !important;
		padding: 10px;
	}
}

.content .mobile {
	display: grid;
	grid-template-columns: 70% 30%;
	grid-template-rows: auto;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	width: 90%;
	margin: 5vh 5vw;
}
.content .mobile .text {
	grid-area: 1 / 1 / 2 / 2;
}
.content .mobile .image {
	grid-area: 1 / 2 / 2 / 3;
	display: flex;
}
.content .mobile .image img {
	width: 100%;
	height: auto;
}
</style>
