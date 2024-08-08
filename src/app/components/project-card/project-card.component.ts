import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.less'
})
export class ProjectCardComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() githubLink: string;

 public openLink():void {
    window.open(this.githubLink, '_blank');
  }
}
