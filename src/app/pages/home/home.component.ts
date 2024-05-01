import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OverlayModule , CdkMenuModule , MatSidenavModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
