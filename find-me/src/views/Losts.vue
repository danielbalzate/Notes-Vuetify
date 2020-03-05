<template>
	<div>
		<v-data-table :headers="headers" :items="desserts" class="elevation-1">
			<template v-slot:item.btn="{item}">
				<v-btn v-model="item.btn">Holas putos</v-btn>
			</template>
		</v-data-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			desserts: [
				{
					name: "Frozen Yogurt",
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					iron: "1%"
				},
				{
					name: "Ice cream sandwich",
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					iron: "1%",
					btn: false
				},
				{
					name: "Eclair",
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					iron: "7%",
					btn: false
				},
				{
					name: "Jelly bean",
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0,
					iron: "0%",
					btn: true
				},
				{
					name: "Lollipop",
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0,
					iron: "2%",
					btn: true
				},
				{
					name: "KitKat",
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
					iron: "6%",
					btn: false
				}
			],
			headers: [
				{
					text: "Dessert (100g serving)",
					align: "start",
					sortable: false,
					value: "name"
				},
				{text: "Calories", value: "calories"},
				{text: "Fat (g)", value: "fat"},
				{text: "Carbs (g)", value: "carbs"},
				{text: "Protein (g)", value: "protein"},
				{text: "Iron (%)", value: "iron"},
				{text: "Gluten-Free", value: "btn"}
			]
		};
	}
};
</script>
