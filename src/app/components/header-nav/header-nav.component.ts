import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-header-nav',
  imports: [NzButtonModule, NzGridModule],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.less'
})
export class HeaderNavComponent {
  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigate([route])
  }
}
