import {Component} from '@angular/core';
import {ProjectCardComponent} from "@components/project-card/project-card.component";
import {ProjectList} from "@configs/projects.config";
import {CommonModule} from "@angular/common";
import {ProjectListModel} from "@models/common.models";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less'
})
export class ProjectsComponent {
  public projects: ProjectListModel[] = ProjectList;
}
