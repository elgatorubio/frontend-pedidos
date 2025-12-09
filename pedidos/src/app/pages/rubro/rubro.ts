import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/producto';
import { CommonModule } from '@angular/common';
import { TarjetaProducto } from '../../core/components/tarjeta-producto/tarjeta-producto';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categorias } from '../../core/interfaces/categorias';

@Component({
  selector: 'app-rubro',
  imports: [TarjetaProducto, CommonModule, RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './rubro.html',
  styleUrl: './rubro.css', 
  standalone: true
})
export class Rubro {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  categoriasService = inject(CategoriasService); 
  ac = inject(ActivatedRoute);

  productos: Producto[] = [];

  ngOnInit() {
    this.headerService.titulo.set('Rubro');
    this.ac.params.subscribe(params => {
      if (params['id']) {
        const id = parseInt(params['id'], 10);
        this.categoriasService.getById(id)
          .then((categoria: Categorias | undefined) => {
            if (categoria) {
              this.productos = categoria.productos; 
              this.headerService.titulo.set(categoria.nombre);
            }
          });
      }
    });
  }
}