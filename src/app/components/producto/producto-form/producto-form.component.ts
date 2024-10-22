import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategoria,IProducto } from '../../../interfaces';
import { CategoriaService } from '../../../services/categoria.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss'
})
export class ProductoFormComponent  {

@Input() productoForm!: FormGroup;
categoria$!: Observable<ICategoria[]>;

constructor(
  private fb: FormBuilder, 
  private categoriaService: CategoriaService
){}

  @Output() callSaveMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callUpdateMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();

  
  


  callSave() {
    let producto: IProducto = {
      nombre: this.productoForm.controls['nombre'].value,
      descripcion: this.productoForm.controls['descripcion'].value,
      precio: this.productoForm.controls['precio'].value,
      cantidad_en_stock: this.productoForm.controls['cantidad_en_stock'].value,  // Cambia a cantidadEnStock
      categoria: {
        id: this.productoForm.controls['categoriaId'].value  // Cambia id_categoria a un objeto categoria con id
      }
    };
  
    if (this.productoForm.controls['id'].value) {
      producto.id = this.productoForm.controls['id'].value;
    }
  
    if (producto.id) {
      this.callUpdateMethod.emit(producto);
    } else {
      this.callSaveMethod.emit(producto);
    }
  }
}  