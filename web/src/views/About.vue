<template>
	<div class="mr-5 ml-5">
		<v-card style="margin-top: 5%">
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
					<!-- <v-list-item-action>
					<v-switch v-model="cycle" label="Cycle Slides" inset></v-switch>
				</v-list-item-action> -->
				</v-list-item>
			</v-list>
		</v-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			team: [
				{
					name: "Lucas Gardini Dias",
					function: "Desenvolvedor Full-Stack",
					photo: "https://scontent.fsjp8-1.fna.fbcdn.net/v/t1.6435-1/p200x200/101030643_1333441810177787_439376687684124672_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=8odtb1Y26goAX_MOzlf&_nc_ht=scontent.fsjp8-1.fna&oh=2370033eddcab159fd60a8942fc8f86f&oe=616B0AB1",
				},
				{ name: "Gabriel Luiz Oliveira", function: "Podre", photo: "" },
				{
					name: "Gabriela Da Silva Ornellas",
					function: "Analista",
					photo: "https://scontent.fsjp8-1.fna.fbcdn.net/v/t1.6435-1/p200x200/106574922_1711632502328639_8855364679354210058_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ZNu5QgVVJHYAX92Ksk9&_nc_ht=scontent.fsjp8-1.fna&oh=34efc84532877ebae6d0a0a2a18f3297&oe=616BECDE",
				},
				{
					name: "Thiago Aio",
					function: "Podre",
					photo: "https://scontent.fsjp8-1.fna.fbcdn.net/v/t31.18172-1/p200x200/24302343_1737924019848157_6938408309947979548_o.jpg?_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=R4kAg1UyuSsAX-xgwWV&tn=xPw77SkLpKKbWjqO&_nc_ht=scontent.fsjp8-1.fna&oh=047e83d20671447de5aed54e9efcd0b8&oe=616D5E52",
				},
				{
					name: "Pedro Comelli Neto",
					function: "Podre",
					photo: "https://scontent.fsjp8-1.fna.fbcdn.net/v/t1.18169-1/c0.7.200.200a/p200x200/13439012_472461412949735_7719418409905100868_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=7206a8&_nc_ohc=uUVE_0QnhYoAX9GePnG&_nc_ht=scontent.fsjp8-1.fna&oh=2ea8acc73b7d5f4dfac67d03e58ae4a3&oe=616B594D",
				},
			],
		};
	},
};
</script>

<style></style>
