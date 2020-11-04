<template>
  <div>
    <div class="page-header page-header-small">
            <parallax
                class="page-header-image"
                style="background-image:url('img/login.jpg');"
            >
            </parallax>
            <div class="container">
                <h2 class="fontTwo" style="letter-spacing:.2em;margin-top:100px;">PRODUCTOS</h2>
            </div>
        </div>
    <div class="container mt-5">
        <div class="row">
            <div  class="col-md-3 p-3 border-category">
                <div >
                    <h3>Categorias</h3>
                    <SfFilter
                        :label="'Todas'"
                        :count="products.length"
                        :selected="selected"
                        :color="color"
                        @change="selected = true, changeCategory('todos', true, null)"
                        style="max-width: 22.875rem;"
                    />
                   <SfFilter
                        v-for="(category, i) in categories" :key="category._id"
                        
                        :label="category.name"
                        :count="category.count"
                        :selected="category.selected"
                        :color="color"
                        @change="category.selected = !category.selected, changeCategory(category.name,category.selected,i)"
                        style="max-width: 22.875rem;"
                    />
                    
                </div>
            </div>
            <div class="col-md-9">
                <div class="row mx-auto">
                    <div v-for="(filter, index) in filters" :key="filter._id" class="col-md-3 pt-1 mx-auto border-category">
                        <SfComponentSelect
                                v-model="filter.active"
                                v-on:change="makeFilter(index,filter.name)"
                                :class="select1.customClass"
                                :label="filter.name"
                                :size="5"
                                :required="false"
                                :valid="true"
                                :disabled="false"
                                :error-message="select1.errorMessage"
                                :persistent="select1.persistent"
                                style="max-width: 30rem;"
                            >
                            <SfComponentSelectOption
                            v-for="(option, key) in filter.options"
                            :key="key"
                            :value="option.name"
                            
                            >
                            <SfProductOption
                                :color="''"
                                :label="option.name"
                            ></SfProductOption>
                            </SfComponentSelectOption>
                        </SfComponentSelect>
                    </div>
                </div>
                <div class="row pl-4 mt-5 mx-auto pt-4">
                    <SfProductCard
                        v-for="(prod, index) in actualProducts"
                        :key="prod._id"
                        class="mx-auto"
                        :image="prod.images[0].url"
                        :image-width="product.imageWidth"
                        :image-height="product.imageHeight"
                        :badge-label="product.badgeLabel"
                        :badge-color="product.badgeColor"
                        :title="prod.name"
                        :link="product.link+prod._id"
                        :link-tag="product.link+prod._id"
                        :score-rating="product.scoreRating"
                        :max-rating="product.maxRating"
                        :reviews-count="product.reviewsCount"
                        :regular-price="'$ '+formatPrice(prod.price)"
                        :special-price="product.specialPrice"
                        :wishlist-icon="product.wishlistIcon"
                        :is-on-wishlist-icon="product.isOnWishlistIcon"
                        :is-on-wishlist="product.isOnWishlist"
                        :show-add-to-cart-button="product.showAddToCartButton"
                        :add-to-cart-disabled="product.addToCartDisabled"
                        :is-added-to-cart="product.isAddedToCart"
                        @click:is-added-to-cart="alert('@click:is-added-to-cart')"
                        @click:wishlist="alert('@click:wishlist')"
                        @click:add-to-cart="pushCart(index)"
                        @click:reviews="alert('@click:reviews')"
                    />
                </div>
                
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode' 
import { SfFilter } from "@storefront-ui/vue";
import { SfComponentSelect } from "@storefront-ui/vue";
import { SfProductOption } from "@storefront-ui/vue";
import { SfProductCard } from "@storefront-ui/vue";
import EventBus from "./components/eventBus"

export default {
  components: {
    SfFilter,
    SfComponentSelect,
    SfProductOption,
    SfProductCard
  },
  data() {
    return {
      configHeader: {headers:{"x-database-connect":endPoint.dataBase}},
      categories:[],
      selected: true,
      label: "Red",
      color: "",
      select1:{
        options: [
            { value: "amaranth", color: "#E52B50", label: "Amaranth" },
            { value: "amber", color: "#FFBF00", label: "Amber" },
            { value: "arctic-lime", color: "#D0FF14", label: "Arctic lime" },
            { value: "bluetiful", color: "#3C69E7", label: "Bluetiful" },
            { value: "buff", color: "#F0DC82", label: "Buff" },
        ],
        label: "Color",
        size: 5,
        required: false,
        valid: true,
        disabled: false,
        errorMessage: "Color",
        persistent: false,
      },
      products:[],
      filters:[],
      actualProducts:[],
      product:{
          image: {
                mobile: { url: "https://storybook.storefrontui.io/assets/storybook/Home/productB.jpg" },
                desktop: { url: "https://storybook.storefrontui.io/assets/storybook/Home/productB.jpg" },
            },
            imageWidth: 216,
            imageHeight: 326,
            badgeLabel: "",
            badgeColor: "color-primary",
            title: "Cotton Sweater",
            link: '/producto?id=',
            linkTag: "",
            scoreRating: 4.5,
            maxRating: 5,
            reviewsCount: 7,
            regularPrice: "$10.99",
            specialPrice: "",
            wishlistIcon: "",
            isOnWishlistIcon: "heart_fill",
            isOnWishlist: false,
            showAddToCartButton: true,
            isAddedToCart: false,
            addToCartDisabled: false,
            }
    }
    
  },
  created(){
        this.getFilter()
        this.getCategories()
        this.getProducts()
    },
    methods: {
        
        getCategories(){
            axios.get(endPoint.endpointTarget+'/categories',this.configHeader)
            .then(res => {
                if (res.data.length != 0) {
                    this.categories = res.data 
                    
                }
                this.categories.forEach((item) => item.selected = false)
                
            })
        },
        getFilter(){
            axios.get(endPoint.endpointTarget+'/filters',this.configHeader)
            .then(res => {
                if (res.data.length != 0) {
                    this.filters = res.data 
                }
            })
        },
        emitMethod(){
            EventBus.$emit("addProduct", "products")
        },
        getProducts(){
            axios.get(endPoint.endpointTarget+'/products',this.configHeader)
            .then(res => {
                if (res.data.length != 0) {
                    this.products = res.data 
                    this.actualProducts = res.data
                }
                
            })
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        changeCategory(name,active,i){
            this.filters.forEach((item) => item.active = false)
            this.actualProducts = []
            if (name == 'todos' ) {
                this.getCategories()
                this.actualProducts = this.products
                this.selected = true
            }
            if (active == false && name != 'todos') {
                this.actualProducts = this.products
                this.selected = true
            }
            if(active == true && name != 'todos'){
                this.getCategories()
                setTimeout(() => {
                   this.categories[i].selected = true
                    for (let i = 0; i < this.products.length; i++) {
                        const element = this.products[i];
                        if (element.category == name) {
                            this.actualProducts.push(element)
                        }
                    }
                    this.selected = false 
                }, 200);
                
            }
        },
        pushCart(i){
            var validation = true
            if (localStorage.cart) {
                const data = JSON.parse(localStorage.cart)
                for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.idProduct == this.actualProducts[i]._id) {
                    element.qty ++
                    localStorage.setItem("cart", JSON.stringify(data))
                    validation = false
                    break
                }
                }
                if (validation) {
                data.push({id:data.length,name:this.actualProducts[i].name,qty:1,image:this.actualProducts[i].images[0].url,idProduct:this.actualProducts[i]._id,data:this.actualProducts[i].category})
                localStorage.setItem("cart", JSON.stringify(data))
                }
                
            }
            else{
                localStorage.setItem("cart",JSON.stringify([{id:0,name:this.actualProducts[i].name,qty:1,image:this.actualProducts[i].images[0].url,idProduct:this.actualProducts[i]._id,data:this.actualProducts[i].category}]))
            }
            this.$swal({
                type: 'success',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                title: 'Agregado a cotizaciones',
                showConfirmButton: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            this.emitMethod()
        },
        makeFilter(i,name){
            var products = []
            for (let index = 0; index < this.filters.length; index++) {
                const element = this.filters[index];
                if (index != i) {
                    element.options.active = false
                }
            }
            
            for (let e = 0; e < this.actualProducts.length; e++) {
                const element = this.actualProducts[e];
                for (let c = 0; c < element.filters.length; c++) {
                    const filt = element.filters[c];
                    if (filt.name == name) {
                        for (let t = 0; t < filt.options.length; t++) {
                            const opt = filt.options[t];
                            console.log(this.filters[i].active)
                            if (opt == this.filters[i].active) {
                                console.log(element)
                                products.push(element)
                                break
                            }
                        }
                    }
                }
            }
            this.actualProducts = products
        }
    } 
};
</script>
<style>
    .border-category{
        border:1px solid #80808033;
    }
    .sf-component-select {
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: var(--component-select-width);
        height: var(--component-select-height);
        padding: 0 !important;
        color: var(--component-select-color, var(--c-text));
        cursor: default;
    }
    .sf-component-select__error-message{
        display: none;
    }
    .sf-component-select__selected {
        --product-option-font-size: var(--font-size--lg);
        --component-select-option-font-size: var(--font-size--lg);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: var(--component-select-selected-align-items, center);
        -ms-flex-align: var(--component-select-selected-align-items, center);
        align-items: var(--component-select-selected-align-items, center);
        -webkit-box-pack: var(--component-select-selected-justify-content, flex-start);
        -ms-flex-pack: var(--component-select-selected-justify-content, flex-start);
        justify-content: var(--component-select-selected-justify-content, flex-start);
        padding: var(--component-select-selected-padding, var(--spacer-sm) var(--spacer-lg) var(--spacer-xs) 0);
        margin:0 !important;
        background: var(--component-select-background);
        color: var(--component-select-color, var(--c-text));
        border: var(--component-select-border, var(--component-select-border-style, solid) var(--component-select-border-color, transparent));
        border-width: var(--component-select-border-width, 0);
    }
    .sf-circle-icon {
        background-color: #42210B;
        margin-bottom: 6% ;
    }
    .sf-rating__icon {
        --icon-color: #FFCB05;
    }
    .sf-component-select {
        padding-top: 5px !important;
    }
</style>