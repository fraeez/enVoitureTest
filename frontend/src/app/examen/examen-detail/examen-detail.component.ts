import { Component, computed, Input } from '@angular/core';
import { Examen, ExamenStatus } from '../../models/exam.model';
import { DatePipe } from '@angular/common';
import { IconAndTextComponent } from '../../uxComponents/icon-and-text/icon-and-text.component';
import { Student } from '../../models/student.model';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-examen-detail',
  imports: [DatePipe, IconAndTextComponent, MatChipsModule],
  templateUrl: './examen-detail.component.html',
  styleUrls: ['./examen-detail.component.scss']
})
export class ExamenDetailComponent {
  @Input() examen!: Examen;

  public formatName(student: Student): string {
    if (!student) return '';
    const firstName = this.capitalize(student.first_name);
    const lastNameInitial = student.last_name ? this.capitalize(student.last_name.charAt(0)) + '.' : '';
    return `${firstName} ${lastNameInitial}`.trim();
  }

  public getIcon(status: ExamenStatus): string {
    switch (status) {
      case ExamenStatus.ToOrganize: return 'send';
      case ExamenStatus.Cancelled: return 'close';
      case ExamenStatus.LookingForSpot: return 'hourglass_top';
      case ExamenStatus.Confirmed: return 'check';
      default: return 'question_mark';
    }
  }

  public getChipClass(status: ExamenStatus): string {
    switch (status) {
      case ExamenStatus.ToOrganize: return 'orange';
      case ExamenStatus.Cancelled: return 'red';
      case ExamenStatus.LookingForSpot: return 'grey';
      case ExamenStatus.Confirmed: return 'green';
      default: return '';
    }
  }

  public getColor(status: ExamenStatus): string {
    switch (status) {
      case ExamenStatus.ToOrganize: return '#cb875f';
      case ExamenStatus.Cancelled: return '#b66952';
      case ExamenStatus.LookingForSpot: return '#818383';
      case ExamenStatus.Confirmed: return '#6e9980';
      default: return '';
    }
  }

  private capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}