import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClientListComponent } from './client-list/client-list.component';

@Component({
  selector: 'app-root',
  imports: [ HttpClientModule, ClientListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
