import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tabs } from './core/components/tabs/tabs';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterLink,Tabs,RouterModule,HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pedidos');
}
