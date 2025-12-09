import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categorias } from '../../core/interfaces/categorias';
import { CommonModule } from '@angular/common';
import { TarjetaCategoria } from '../../core/components/tarjeta-categoria/tarjeta-categoria';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,         
  imports: [TarjetaCategoria, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  headerService = inject(HeaderService);
  categoriasService = inject(CategoriasService);
  categorias:Categorias[] = [];

  ngOnInit(): void {
    this.headerService.titulo.set('home');
    this.headerService.extendido.set(true);
    this.categoriasService.getAll().then(res => this.categorias = res);
  }

  ngOnDestroy(): void {
    this.headerService.extendido.set(false);
  }
}