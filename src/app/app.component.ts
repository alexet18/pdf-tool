import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderNavComponent } from "./components/header-nav/header-nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, HeaderNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'pdf-tool';
}
