import { Component , inject} from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
    HeaderService = inject(HeaderService);
  ngOnInit(): void{
    this.HeaderService.titulo.set("perfil")
  }

  perfil:DatosPerfil = {
    nombre:"",
    direccion:"",
    telefono:"",
    detalleEntrega:""
  }


}
