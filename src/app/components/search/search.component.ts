import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { FilterService } from '../../services/filter.service';
import { Language } from '../../models/language.model';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { Observable, map } from 'rxjs';
import { SharedRepositoryService } from '../../services/shared-repository.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule, DropDownListModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  protected languages$!: Observable<string[]>;
  protected sortOrders: string[] = ['asc', 'desc'];
  protected selectedLanguage: string = 'JavaScript';
  protected selectedSortOrder: string = 'desc';

  constructor(
    private languageService: LanguageService,
    private filterService: FilterService,
    private sharedRepositoryService: SharedRepositoryService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.fetchLanguages();
  }

  fetchLanguages(): void {
    this.languages$ = this.languageService.fetchLanguages().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((languages: Language[]) => languages.map((language) => language.name))
    );
  }

  searchRepositories(language: string, sortOrder: string): void {
    this.sharedRepositoryService.setPageNumber(1);
    this.filterService.setFilters({ language, sortOrder });
  }
}
