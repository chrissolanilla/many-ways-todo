import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ItemComponent, Item } from '../../components/item/item';

@Component({
    selector: 'app-todo-page',
    standalone: true,
    imports: [NavbarComponent, ItemComponent],
    templateUrl: './todo.html',
    styleUrl: './todo.css'
})
export class TodoPageComponent {
    // items = signal(['Sell user data', 'Eat more ram']);
    //need type Item[] not type Item
    items = signal<Item[]>([
        { id: 1, text: 'Sell user data', done: false },
        { id: 2, text: 'Eat more ram', done: false },
    ]);
    newItem = signal('');
    nextId = 3;

    addItem(){
        console.log("TEST");
        const text = this.newItem();
        if(!text) {
            //maybe warn them
            return;
        }

        const newTodo: Item = {
            id: this.nextId++,
            text,
            done: false,
        };

        //why is this syntax so weird, it is shallow update right? not updating the whole thing right?
        //this DOES create a new array instead of mutating it.
        this.items.update(items => [...items, newTodo]);
        //why do we set new item to nothign? why does it exist?
        //to clear input after we click done
        this.newItem.set('');
    }

    toggleItem(id: number) {
        this.items.update(items =>
            items.map(item =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    }

    deleteItem(id: number) {
        this.items.update(items =>
            items.filter(item => item.id !== id)
        );
    }
}
