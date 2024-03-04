import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const todos = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: true },
  { id: 3, title: 'Angular', completed: false },
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isEditing = false;
  todos = todos;
}
  