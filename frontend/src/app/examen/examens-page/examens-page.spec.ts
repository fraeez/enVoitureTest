import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamensPage } from './examens-page';

describe('ExamensPage', () => {
  let component: ExamensPage;
  let fixture: ComponentFixture<ExamensPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamensPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
