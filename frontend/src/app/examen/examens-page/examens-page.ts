import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ExamensService } from '../examens.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Examen, ExamenStatus } from '../../models/exam.model';
import { MatDialog } from '@angular/material/dialog';
import { NewExamModalComponent } from './new-exam-modal.component';
import { Student } from '../../models/student.model';
import { startWith, Subject, switchMap, tap } from 'rxjs';
import { ExamenDetailComponent } from '../examen-detail/examen-detail.component';

@Component({
  selector: 'app-examens-page',
  imports: [MatButtonModule, ExamenDetailComponent],
  providers: [ExamensService],
  templateUrl: './examens-page.html',
  styleUrl: './examens-page.scss'
})
export class ExamensPage {
  private readonly examensService = inject(ExamensService);
  private readonly dialog = inject(MatDialog);

  private refreshTrigger = new Subject<void>();

  public examens: Signal<Examen[]> = toSignal(
    this.refreshTrigger.pipe(
      startWith([]),
      switchMap(() => this.examensService.GetExamens())
    ),
    { initialValue: [] }
  );

  private readonly examNumber: Signal<number> = computed(() => this.examens().length);
  private readonly isGreaterThanTwo: Signal<boolean> = computed(() => this.examNumber() > 1);
  public readonly examLabel: Signal<string> = computed(() => `${this.examNumber()} examen${this.isGreaterThanTwo() ? 's' : ''} à venir`);


  openNewExamModal() {
    this.dialog.open(NewExamModalComponent, {
      width: '600px',
      data: {
        examen: new Examen(new Student('', ''), ExamenStatus.ToOrganize, undefined, undefined),
        callback: (examen: Examen) => this.examensService.CreateExamen(examen)
      }
    }).afterClosed().pipe(
      tap(() => this.refreshTrigger.next()),
    ).subscribe();
  }
}

