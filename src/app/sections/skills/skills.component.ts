import { Component } from '@angular/core';
import {TechStack} from "@configs/skills.config";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.less'})
export class SkillsComponent {
public techStack=TechStack;
}
