import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-button]',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

}
