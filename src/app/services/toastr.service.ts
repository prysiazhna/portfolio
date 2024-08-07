import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ToastrType} from "@models/common.enums";

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) {
  }

  public showToastr(type: ToastrType, title: string, message: string): void {
    const options = {
      progressBar: true,
      titleClass: 'toastr-title',
      messageClass: 'toastr-message',
      positionClass: 'toast-top-center',
      closeButton: true
    };

    this.toastr[type](message, title, options);
  }
}
