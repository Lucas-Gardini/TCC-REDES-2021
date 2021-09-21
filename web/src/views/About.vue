<template>
	<div :class="isMobile ? 'mr-5 ml-5' : 'mr-16 ml-16'">
		<v-card style="margin-top: 5%; margin-bottom: 5%">
			<v-card-title>Equipe</v-card-title>
			<v-list two-line>
				<v-list-item v-for="(member, index) in team" :key="index">
					<v-list-item-avatar>
						<v-img :src="member.photo"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ member.name }}</v-list-item-title>
						<v-list-item-subtitle>{{ member.function }}</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn
							v-if="member.social"
							:href="member.social.href"
							target="_blank"
							icon
							:color="member.social.color"
						>
							<v-icon v-html="member.social.icon"></v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-list>
		</v-card>
	</div>
</template>

<script>
export default {
	props: {
		isMobile: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	data() {
		return {
			team: [
				{
					name: "Lucas Gardini Dias",
					function: "Desenvolvedor Full-Stack",
					photo: "https://i.imgur.com/EFJTt5S.jpg",
					social: {
						color: "black",
						icon: "mdi-github",
						href: "https://github.com/Lucas-Gardini",
					},
				},
				{
					name: "Gabriel Luiz Oliveira",
					function: "Podre",
					photo: "https://i.imgur.com/6vxTjxy.jpg",
					social: {
						color: "blue",
						icon: "mdi-map-marker-question",
						href: "",
					},
				},
				{
					name: "Gabriela Da Silva Ornellas",
					function: "Podre",
					photo: "https://i.imgur.com/9NA4lLd.jpg",
					social: {
						color: "pink",
						icon: "mdi-instagram",
						href: "https://www.instagram.com/gabiiornellas_/",
					},
				},
				{
					name: "Thiago Aio",
					function: "Podre",
					photo: "https://i.imgur.com/HXVL7J4.jpg",
					social: {
						color: "blue",
						icon: "mdi-map-marker-question",
						href: "",
					},
				},
				{
					name: "Pedro Comelli Neto",
					function: "Podre",
					photo: "https://i.imgur.com/LKPmHNZ.jpg",
					social: {
						color: "pink",
						icon: "mdi-instagram",
						href: "https://www.instagram.com/pedrocomelli/",
					},
				},
			],
		};
	},
};
</script>

<style></style>
