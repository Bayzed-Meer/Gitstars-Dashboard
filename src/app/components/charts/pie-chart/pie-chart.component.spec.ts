import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RepositoryService } from '../../../services/repository.service';
import { LanguageService } from '../../../services/language.service';
import { PieChartComponent } from './pie-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { of } from 'rxjs';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  let languageService: LanguageService;
  let repositoryService: RepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PieChartComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;

    languageService = TestBed.inject(LanguageService);
    repositoryService = TestBed.inject(RepositoryService);
    
    const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch languages on ngOnInit', () => {
    const fetchLanguagesSpy = jest.spyOn(component, 'fetchLanguages');
    component.ngOnInit();
    expect(fetchLanguagesSpy).toHaveBeenCalled();
  });

  it('should fetch repository counts on searchRepositoryCounts', fakeAsync(() => {
    const languages = ['TypeScript', 'JavaScript'];
    const fetchRepositoriesSpy = jest.spyOn(repositoryService, 'fetchRepositories').mockReturnValue(of({ total_count: 100, items: [] }));
    component.multiselect = { value: languages } as MultiSelectComponent;
    component.searchRepositoryCounts();
    tick();
    expect(fetchRepositoriesSpy).toHaveBeenCalledTimes(languages.length);
    expect(component.pieChartData$).toBeDefined();
  }));
});
