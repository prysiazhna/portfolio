import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.less'
})
export class ProjectCardComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() githubLink: string;
}
