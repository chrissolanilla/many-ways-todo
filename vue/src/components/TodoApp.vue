<script setup>
import { ref } from "vue";
import  Item  from "./Item.vue";

defineProps({
    msg: String,
});

const items = ref([
	{text: "Learn Vue", done: true},
	{text: "Update Soulpatch from vue2 to vue3", done: false},
]);

const textInput = ref("")

function spawnItem(){
	console.log("spawning item", textInput);
	items.value.push({text: textInput.value, done: false});
	textInput.value = "";
}

//notice we dont need to say useState
const count = ref(0);
</script>

<template>
    <h1>{{ msg }}</h1>

	<!-- simple but inntuitive html onclick attributes similar to vanilla -->
	<button type="button" @click="count++"> counter btw: {{count}}</button>

    <div class="card">
		<input
			type="text"
			placeholder="Add an item..."
			v-model="textInput"

		/>
		<button @click="spawnItem">Add</button>

		<div v-if="items.length === 0">
			No items
		</div>

		<div v-else class="item" v-for="item in items">
            <Item
				:text="item.text"
				:done="item.done"
				@remove="items.splice(i,1)"
			/>
        </div>
    </div>

</template>

<style scoped>

input {
	padding: 1em;
	border-radius: 1em;
	margin-right: 1em;
	border: 1px solid #ccc;
}
.read-the-docs {
    color: #888;
}
</style>
