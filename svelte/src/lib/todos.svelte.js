function makeSlug(text) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

class TodoStore {
	//RUNES
	//major change from 4 to 5
	items = $state([]);

	load() {
		//same idea as react local storage
		const raw = localStorage.getItem('todos');

		if (raw) {
			this.items = JSON.parse(raw);
		}
	}

	save() {
		localStorage.setItem('todos', JSON.stringify(this.items));
	}

	add(title, description = '') {
		const cleanTitle = title.trim();
		if (!cleanTitle) return null;

		let baseSlug = makeSlug(cleanTitle);
		let slug = baseSlug || 'untitled-todo';
		let count = 1;

		//make slug unique in case two todos have the same title
		//for making new titles/routes
		while (this.items.some((item) => item.slug === slug)) {
			count++;
			slug = `${baseSlug}-${count}`;
		}

		const todo = {
			id: crypto.randomUUID(),
			title: cleanTitle,
			description: description.trim(),
			done: false,
			slug,
			createdAt: new Date().toISOString()
		};

		this.items = [todo, ...this.items];
		this.save();
		return todo;
	}

	remove(id) {
		this.items = this.items.filter((item) => item.id !== id);
		this.save();
	}

	toggle(id) {
		this.items = this.items.map((item) =>
			item.id === id ? { ...item, done: !item.done } : item
		);
		this.save();
	}

	getBySlug(slug) {
		return this.items.find((item) => item.slug === slug);
	}
}

export const todos = new TodoStore();
