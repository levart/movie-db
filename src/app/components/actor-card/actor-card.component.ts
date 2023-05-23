import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImagePipe} from "../../core/pipes";

@Component({
  selector: 'app-actor-card',
  standalone: true,
  imports: [CommonModule, ImagePipe],
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss']
})
export class ActorCardComponent {

  @Input({
    required: true,
  }) actor: any;

}
