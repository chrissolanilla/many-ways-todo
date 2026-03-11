import { Routes } from '@angular/router';
import { TodoPageComponent } from './pages/todo/todo';
import { HomePageComponent } from './pages/home/home';

// export const routes: Routes = [];
export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'todo', component: TodoPageComponent },
];
