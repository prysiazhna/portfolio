import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AvatarComponent} from "@components/avatar/avatar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less'
})
export class MainComponent {
  public downloadCV(): void {
    const fileUrl = '/assets/files/Olha_Prysiazhna_CV.pdf';
    const fileName = 'Olha_Prysiazhna_CV.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
