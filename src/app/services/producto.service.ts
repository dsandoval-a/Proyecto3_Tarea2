import { inject,Injectable, signal } from '@angular/core';
import { IProducto,  ISearch} from '../interfaces';
import { BaseService } from './base-service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductoService extends BaseService<IProducto> {



  protected override source: string ='productos';
  private productoListSignal = signal <IProducto[]>([]);
  get producto$(){
    return this.productoListSignal;
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
                this.productoListSignal.set(response.data)
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }
    
 
  save(producto: IProducto) {
    // Asegúrate de que id_categoria no esté vacío
    if (!producto.categoria.id) {
      this.alertService.displayAlert('error', 'Categoría es requerida', 'center', 'top', ['error-snackbar']);
      return; // Detener la ejecución si no hay categoría
    }

    // Aquí se realiza la llamada al servidor para guardar el producto
    this.createCustomSource(producto).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll(); // Llama a getAll para actualizar la lista de productos
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Error al crear producto', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
  
  

  update(productos: IProducto){
    this.editCustomSource(`${productos.id}`, productos).subscribe({
      next: (response: any) => {

        this.alertService.displayAlert('success', response.message,'center','top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Producto no fue editado','center','top', ['error-snackbar']);

        console.error('error', err);
      }
    });
  }

  delete(productos: IProducto){
    this.delCustomSource(`${productos.id}`).subscribe({
      next: (response: any) => {

        this.alertService.displayAlert('success', response.message,'center','top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Producto no fue eliminado','center','top', ['error-snackbar']);

        console.error('error', err);
      }
    });
  }
}
