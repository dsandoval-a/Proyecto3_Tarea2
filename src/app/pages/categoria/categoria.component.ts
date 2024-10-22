import { ModalService } from './../../services/modal.service';
import { ModalComponent } from './../../components/modal/modal.component';
import { Component, inject, ViewChild } from '@angular/core';
import { CategoriaListComponent } from "../../components/categoria/categoria-list/categoria-list.component";
import { CategoriaService } from '../../services/categoria.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriaFormComponent } from "../../components/categoria/categoria-form/categoria-form.component";
import { ICategoria } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, CategoriaListComponent, PaginationComponent, ModalComponent, LoaderComponent, CategoriaFormComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  public categoriaService: CategoriaService = inject(CategoriaService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService); 
    public isSuperAdmin: boolean = false;
  @ViewChild('addCategoriaModal') public addCategoriaModal: any;

  public fb: FormBuilder = inject(FormBuilder);
  categoriaForm = this.fb.group({    
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required], 
})

  constructor(){
    this.checkSuperAdmin();
    this.categoriaService.getAll();
    this.categoriaService.getAllAsObservable();
    
  }

  private checkSuperAdmin(): void {
    // Verificar si el usuario es Super Admin y actualizar la propiedad
    this.isSuperAdmin = this.authService.isSuperAdmin();
  }

  saveCategoria(categoria: ICategoria){

   this.categoriaService.save(categoria);
   this.modalService.closeAll();
  }

  callEdition(categoria: ICategoria){
    this.categoriaForm.controls['id'].setValue(categoria.id ? JSON.stringify(categoria.id) : '');
    this.categoriaForm.controls['nombre'].setValue(categoria.nombre ? categoria.nombre : '');
    this.categoriaForm.controls['descripcion'].setValue(categoria.descripcion ? categoria.descripcion : '');
    this.modalService.displayModal('md', this.addCategoriaModal);
  }

  updateCategoria(categoria: ICategoria){
    this.categoriaService.update(categoria);
    this.modalService.closeAll();
    
  }

}
