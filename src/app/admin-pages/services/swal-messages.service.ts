import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SwalMessagesService {
  constructor() {
  }

  public displayErrorResponseMessage(error_response: any) {
    if (error_response && error_response.error) {
      this.showMessageDialog('Whoop! Request Failed!', error_response.error.error, 'error')
    } else {
      this.showMessageDialog('Whoop! Failed!', 'Something Went Wrong!', 'error')
    }
  }

  public showMessageDialog(title, message, type) {
    swal(
        {
          title: title,
          text: message,
          type: type,
          confirmButtonColor: '#DD6B55'
        });
  }

  public showNotification(type_id, from, align, message_text) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: 'notifications',
      message: message_text,
    }, {
      type: type[type_id],
      timer: 10,
      placement: {
        from: from,
        align: align
      },
      // tslint:disable-next-line:max-line-length
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
      // tslint:disable-next-line:max-line-length
      '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
      '<i class="material-icons" data-notify="icon">notifications</i> ' +
      '<span data-notify="title">{1}</span> ' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      // tslint:disable-next-line:max-line-length
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    });
  }
}
