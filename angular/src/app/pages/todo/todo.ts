import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ItemComponent, Item } from '../../components/item/item';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
    selector: 'app-todo-page',
    standalone: true,
    imports: [NavbarComponent, ItemComponent, CdkDropList, CdkDrag],
    templateUrl: './todo.html',
    styleUrl: './todo.css'
})
export class TodoPageComponent {
    // items = signal(['Sell user data', 'Eat more ram']);
    //need type Item[] not type Item
    items = signal<Item[]>([
        { id: 1, text: 'Sell user data', done: false },
        { id: 2, text: 'Eat more ram', done: false },
        { id: 3, text: 'Uninstall Angular', done: false },
    ]);
    newItem = signal('');
    nextId = 4;

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

        //this DOES create a new array instead of mutating it.
        //we DO NOT mutate the array directly
        //angular signals detect changes by REFERENCE, not by internal mutation.
        //if we push() into the existing array, the reference stays the same(most things in js land are objects)
        //so angular may not realize anything changed and the UI might not rerender.
        //instead we create a NEW array with [...items, newTodo]
        //this keeps state updates "immutable" so we can check oldArray !== newArray
        // which makes change detection predictable, easier to debug,
        this.items.update(items => [...items, newTodo]);

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

    drop(event: CdkDragDrop<Item[]>) {
        const updated = [...this.items()];
        moveItemInArray(updated, event.previousIndex, event.currentIndex);
        this.items.set(updated);
    }
}
