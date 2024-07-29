import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path: '',component:ProductsComponent}
    ,{path: 'products',component:ProductsComponent}
    ,{path: 'about',component:AboutUsComponent}
    ,{path: 'contact',component:ContactUsComponent}
    ,{ path: 'product-details/:id', component: ProductDetailsComponent }
    ,{path: 'cart',component:CartComponent}
    ,{path: '**',component:PageNotFoundComponent}
];
