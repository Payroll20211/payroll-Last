import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPeriod } from '../period.model';
import { PeriodService } from '../service/period.service';

@Component({
  templateUrl: './period-delete-dialog.component.html',
})
export class PeriodDeleteDialogComponent {
  period?: IPeriod;

  constructor(protected periodService: PeriodService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.periodService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
