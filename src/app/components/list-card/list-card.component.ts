import {Component, ContentChild, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovieCardComponent} from "../movie-card/movie-card.component";
import {Movie} from "../../core/interfaces";

@Component({
  selector: 'app-list-card',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit{
  @Input() title: string = '';
  @Input() autoplay: boolean = false;
  @Input() movies: Movie.Movie[] = [];

  @ContentChild('headerBtn') headerBtn?: TemplateRef<any>

  constructor() {
  }

  ngOnInit(): void {
  }

}
