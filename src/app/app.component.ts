import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./sections/header/header.component";
import {MainComponent} from "./sections/main/main.component";
import {ThemeSwitcherComponent} from "@components/theme-switcher/theme-switcher.component";
import {SkillsComponent} from "./sections/skills/skills.component";
import {ProjectsComponent} from "./sections/projects/projects.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainComponent, ThemeSwitcherComponent, SkillsComponent, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
}
