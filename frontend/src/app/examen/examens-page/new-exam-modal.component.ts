import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Examen, ExamenStatus } from '../../models/exam.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-new-exam-modal',
    providers: [provideNativeDateAdapter()],
    imports: [MatFormFieldModule, MatProgressSpinnerModule, MatDatepickerModule, MatTimepickerModule, CommonModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
    templateUrl: './new-exam-modal.component.html',
    styleUrls: ['./new-exam-modal.component.scss']
})
export class NewExamModalComponent {
    examenStatuses = Object.values(ExamenStatus);
    errorAPI: WritableSignal<boolean> = signal(false);
    isSubmitting: WritableSignal<boolean> = signal(false);

    constructor(
        public dialogRef: MatDialogRef<NewExamModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            examen: Examen,
            callback: (exam: Examen) => Observable<void>,
        },
    ) {
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(form: NgForm): void {
        this.errorAPI.set(false);
        if (form.valid) {
            this.isSubmitting.set(true); 
            this.data.callback(this.data.examen).subscribe({
                next: () => {
                    this.isSubmitting.set(false);
                    this.dialogRef.close(this.data.examen);
                },
                error: () => {
                    this.isSubmitting.set(false); 
                    this.errorAPI.set(true);
                }
            });
        }
    }
}