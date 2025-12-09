import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/producto';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.html',
  styleUrl: './articulo.css',
  standalone: true,
  imports: [CommonModule],
})
export class Articulo {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  producto?: Producto;

  constructor(private ac: ActivatedRoute) {
    this.ac.params.subscribe((params) => {
      if (params['id']) {
        this.productosService.getById(Number(params['id']))
          .then((producto) => {
            if (producto) {
              this.producto = producto;
              this.headerService.titulo.set(producto.nombre);
            }
          });
      }
    });
  }

  ngOnInit(): void {
    this.headerService.titulo.set('Artículo');
  }
}