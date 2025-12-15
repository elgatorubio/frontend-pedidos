import { Component, Input, Output, OnInit, signal, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.html',
  styleUrl: './contador.css',
})
export class Contador implements OnInit {
  ngOnInit(): void {
    this.numero.set(this.cantidadInicial);
  }

  numero = signal(1);
  @Output() cantidadCambiada = new EventEmitter<number>();
  @Input() cantidadInicial: number = 1;

  actualizarNumero(diferencia: number) {
    this.numero.set(Math.max(this.numero() + diferencia, 1));
    // Emitir el nuevo valor
    this.cantidadCambiada.emit(this.numero());
  }
}