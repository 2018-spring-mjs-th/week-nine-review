import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: [
    './error-modal.component.css'
]
})
export class ErrorModalComponent {
  constructor(private activeModal: NgbActiveModal) { }
}
