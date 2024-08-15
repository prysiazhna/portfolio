import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ProjectModel} from "@models/common.models";

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgOptimizedImage,CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.less'
})
export class ProjectCardComponent {
  @Input() project: ProjectModel;

  public openLink(link: string): void {
    window.open(link, '_blank');
  }
}
