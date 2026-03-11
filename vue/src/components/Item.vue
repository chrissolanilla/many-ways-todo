<script setup>
import {ref} from 'vue'
import {computed} from 'vue'

const props = defineProps({
	text: String,
	done: Boolean
});

const isDone = ref(props.done ?? false);
const emit = defineEmits(["remove"])

function remove(){
    emit("remove")
}

function toggleDone(){
	isDone.value = !isDone.value
}
</script>

<template>
	<div class="item">
		<span
			:class="{done: isDone}"
		>
			{{text}}
		</span>
		<div class="buttons">
			<button @click="toggleDone">Done</button>
			<button @click="remove">Remove</button>
		</div>
	</div>
</template>

<style scoped>
.buttons {
	margin-left: 1rem;
	display: flex;
	gap: 1rem;
}
.item {
	background: #2c3e50;
	padding:1rem;
	margin:1rem;
	border-radius: 1rem;
	font-weight: bold;
	color: #fff;
	display: flex;
	justify-content: space-between;
}
.done{
    color: green;
}
</style>
