import { ICategoria, IResponse, ISearch } from './../interfaces/index';
import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria> {

  protected override source: string ='categorias';
  private categoriaListSignal = signal <ICategoria[]>([]);
  get categorias$(){
    return this.categoriaListSignal;
  }

  public search: ISearch = {
    page: 1,
    size: 5
  }

  public totalItems: any = [];

  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);


  getAll(){
    this.findAllWithParams(this.search).subscribe({
      next: (response: any) => {
        this.search = {...this.search, ...response.meta}
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages:0}, (_, i) => i+1);
                this.categoriaListSignal.set(response.data)
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  getAllAsObservable(): Observable<ICategoria[]> {
    return this.findAllWithParams(this.search).pipe(
      map((response: IResponse<ICategoria[]>) => response.data) 
    );
  }
  getAllWithoutPagination(): Observable<ICategoria[]> {
    return this.findAll().pipe(
      map((response: IResponse<ICategoria[]>) => response.data)
    );
  }

  save(categorias: ICategoria){
    this.add(categorias).subscribe({
      next: (response: any) => {

        this.alertService.displayAlert('success', response.message,'center','top', ['success-snackbar']);
        this.getAll
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Categoria no fue creada','center','top', ['error-snackbar']);

        console.error('error', err);
      }
    });
  }

  update(categorias: ICategoria){
    this.editCustomSource(`${categorias.id}`, categorias).subscribe({
      next: (response: any) => {

        this.alertService.displayAlert('success', response.message,'center','top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Categoria no fue editada','center','top', ['error-snackbar']);

        console.error('error', err);
      }
    });
  }

  delete(categorias: ICategoria){
    this.delCustomSource(`${categorias.id}`).subscribe({
      next: (response: any) => {

        this.alertService.displayAlert('success', response.message,'center','top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Categoria no fue eliminada','center','top', ['error-snackbar']);

        console.error('error', err);
      }
    });
  }
}
