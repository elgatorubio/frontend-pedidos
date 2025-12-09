import { Routes } from '@angular/router';
import { Carrito } from './pages/carrito/carrito';
import { Rubro } from './pages/rubro/rubro';
import { Articulo } from './pages/articulo/articulo';
import { Perfil } from './pages/perfil/perfil';
import { Buscar } from './pages/buscar/buscar';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path:"",
        component: Home
    },
    {
    path:"carrito",
    component: Carrito
    },
    {
        path:"categoria/:id",
        component: Rubro
    },
    {
        path:"articulo/:id",
        component: Articulo
    },
    {
        path:"perfil",
        component: Perfil
    },
    {
        path: "buscar",
        component: Buscar
    }
];
