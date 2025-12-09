import { Producto } from "./producto";

export interface Categorias{
    id:number,
    nombre: string,
    fotoUrl: string,
    productos: Producto[] 
}