  import { ModalService } from './../../services/modal.service';
  import { ModalComponent } from './../../components/modal/modal.component';
  import { Component, inject, ViewChild } from '@angular/core';
  import { ProductoListComponent } from "../../components/producto/producto-list/producto-list.component";
  import { ProductoService } from '../../services/producto.service';
  import { PaginationComponent } from '../../components/pagination/pagination.component';
  import { LoaderComponent } from '../../components/loader/loader.component';
  import { ProductoFormComponent } from "../../components/producto/producto-form/producto-form.component";
  import { IProducto } from '../../interfaces';
  import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-producto',
    standalone: true,
    imports: [ CommonModule, ProductoListComponent, PaginationComponent, ModalComponent, LoaderComponent, ProductoFormComponent],
    templateUrl: './producto.component.html',
    styleUrl: './producto.component.scss'
  })

  export class ProductoComponent {

    public productoService: ProductoService = inject(ProductoService);
    public modalService: ModalService = inject(ModalService);
    public authService: AuthService = inject(AuthService); 
    public isSuperAdmin: boolean = false;

    @ViewChild('addProductoModal') public addProductoModal: any;

    public fb: FormBuilder = inject(FormBuilder);
    productoForm = this.fb.group({    
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required], 
      precio: ['', Validators.required], 
      cantidad_en_stock: ['', Validators.required],
      categoriaId: ['', Validators.required]


      

  })

    constructor(){
      this.productoService.getAll();
      this.checkSuperAdmin();
    }

    private checkSuperAdmin(): void {
      // Verificar si el usuario es Super Admin y actualizar la propiedad
      this.isSuperAdmin = this.authService.isSuperAdmin();
    }

    saveProducto(producto: IProducto){
        // Convertimos el id de la categoría en un objeto categoría antes de enviar
        const formValue = this.productoForm.value;
        const productoG = {
          ...formValue,
          categoria: { id: formValue.categoriaId }  // Crea el objeto categoria a partir del id de la categoría
        };
        delete productoG.categoriaId;  // Si no necesitas `categoriaId` en el objeto final, lo puedes eliminar
    

    this.productoService.save(producto);
    this.modalService.closeAll();
    }

    callEdition(producto: IProducto) {
      this.productoForm.patchValue({
        id: producto.id ? String(producto.id) : '', 
        nombre: producto.nombre ? producto.nombre : '',
        descripcion: producto.descripcion ? producto.descripcion : '',
        precio: producto.precio ? String(producto.precio) : '',
        cantidad_en_stock: producto.cantidad_en_stock ? String(producto.cantidad_en_stock) : '', 
        categoriaId: producto.categoria && producto.categoria.id ? String(producto.categoria.id) : ''  // Cambia a producto.categoria.id
      });
      
      this.modalService.displayModal('md', this.addProductoModal);
    }
    
    

    updateProducto(producto: IProducto){
      this.productoService.update(producto);
      this.modalService.closeAll();
      
    }

  }
