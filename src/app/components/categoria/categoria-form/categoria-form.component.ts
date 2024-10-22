import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() categoriaForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callUpdateMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();



  callSave(){
    let categoria: ICategoria = {
      nombre: this.categoriaForm.controls['nombre'].value,
      descripcion: this.categoriaForm.controls['descripcion'].value
    }
    if(this.categoriaForm.controls['id'].value){
      categoria.id = this.categoriaForm.controls['id'].value;
    }
    if(categoria.id){
      this.callUpdateMethod.emit(categoria);
    }else{
      this.callSaveMethod.emit(categoria);

    }
  }

}
