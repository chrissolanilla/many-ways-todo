import { Component, input, output } from '@angular/core';

export type Item = {
    id: number;
    text: string;
    done: boolean;
};

@Component({
    selector: 'app-item',
    standalone: true,
    templateUrl: './item.html',
    styleUrl: './item.css'
})
export class ItemComponent {
    todo = input.required<Item>();

    toggle = output<number>();
    deleteTodo = output<number>();

    onToggle() {
        this.toggle.emit(this.todo().id);
    }

    onDelete() {
        this.deleteTodo.emit(this.todo().id);
    }
}
