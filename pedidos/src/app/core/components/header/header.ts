// header.ts
import { Component, inject , effect , signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  headerService = inject(HeaderService);
  classAplicada = signal("");
  tituloMostrado = signal("");

  esconderTitulo = effect(() =>{
    if (this.headerService.titulo()){
      this.classAplicada.set("fade-out");
    }
  },{allowSignalWrites:true});

  mostrarTituloNuevo(e:AnimationEvent){
    console.log(e);
    if (e.animationName.includes("fade-out")){
    this.tituloMostrado.set(this.headerService.titulo());
    this.classAplicada.set("fade-in");
    setTimeout(() =>this.classAplicada.set(""), 250);
    }
  }
}