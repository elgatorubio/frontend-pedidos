import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/producto';
import { Contador } from '../../core/components/contador/contador';
import { signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.html',
  styleUrl: './articulo.css',
  standalone: true,
  imports: [CommonModule, Contador ],
})
export class Articulo {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  cartService = inject(CartService);
  producto?: Producto;
  cantidad = signal(1);
  private router = inject(Router);

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

  agregarAlCarrito() {
    if (!this.producto) return;
      this.cartService.agregarProducto(this.producto?.id, this.cantidad());
      this.router.navigate(['/carrito']);
    
  }
}