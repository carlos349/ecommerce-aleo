import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import About from './pages/About.vue';
import Contact from './pages/Contact.vue';
import Products from './pages/Products.vue';
import checkout from './pages/checkout.vue';
import SingleProduct from './pages/SingleProduct.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/inicio',
      name: 'indexTwo',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/ingreso',
      name: 'login',
      components: { default: Login, header: MainNavbar },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: '/registro',
      name: 'register',
      components: { default: Register, header: MainNavbar ,footer: MainFooter},
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: '/nosotros',
      name: 'about',
      components: { default: About, header: MainNavbar,footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: '/contacto',
      name: 'contact',
      components: { default: Contact, header: MainNavbar,footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: '/products',
      name: 'products',
      components: { default: Products, header: MainNavbar,footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: '/producto',
      name: 'singleProduct',
      components: { default: SingleProduct, header: MainNavbar,footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      components: { default: checkout, header: MainNavbar,footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
