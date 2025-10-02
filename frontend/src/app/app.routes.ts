import { Routes } from '@angular/router';
import { ExamensPage } from './examen/examens-page/examens-page';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/examens', 
        pathMatch: 'full'
    }, 
    { 
        path: 'examens', 
        component: ExamensPage, 
    },
];
