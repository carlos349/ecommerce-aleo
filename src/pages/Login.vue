<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card v-if="register == false" type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/logo.png'" alt="" />
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Correo"
              v-model="email"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="Contraseña"
              type="password"
              v-model="pass"
            >
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a
                  @click="login()"
                  style="cursor:pointer"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  >Ingresar</a
                >
              </div>
              <div class="pull-left">
                <h6>
                  <a @click="register = true" style="cursor:pointer" class="link footer-link">Crear cuenta</a>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a  class="link footer-link">¿Olvidaste tu clave?</a>
                </h6>
              </div>
            </template>
          </card>
          <card v-else type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/logo.png'" alt="" />
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Nombre"
              v-model="dataRegister.name"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Apellido"
              v-model="dataRegister.lastName"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Correo"
              v-model="dataRegister.email"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="Contraseña"
              type="password"
              v-model="dataRegister.pass"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="Reepetir contraseña"
              type="password"
              v-model="dataRegister.passR"
            >
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a
                  @click="registerClient()"
                  style="cursor:pointer"
                  class="btn btn-primary btn-round btn-lg btn-block"
                  >Registrar</a
                >
              </div>
              <div class="pull-left">
                <h6>
                  <a @click="register = false" style="cursor:pointer" class="link footer-link">¿Ya tienes cuenta?</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
import MainFooter from '@/layout/MainFooter';
import axios from 'axios'
import router from '../router'
import endPoint from '../../config-endpoint/endpoint.js'
import jwtDecode from 'jwt-decode'

export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data(){
    return {
      email:'',
      pass:'',
      configHeader: {headers:{"x-database-connect":endPoint.dataBase}},
      dataRegister:{
        name:'',
        lastName:'',
        email:'',
        pass:'',
        passR:''
      },
      register:false
    }
  },
  methods: {
    registerClient() {
      var valid = false
      if (this.dataRegister.email.includes("@")) {
        valid = true
      }
      else{
        this.$swal({
            type: 'error',
            icon: 'error',
            timer: 3000,
            timerProgressBar: true,
            title: 'Debes ingresar un correo valido',
            showConfirmButton: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
      }
      if (valid && this.dataRegister.pass.length < 8) {
         valid = false
        this.$swal({
            type: 'error',
            icon: 'error',
            timer: 3000,
            timerProgressBar: true,
            title: 'La contraseña debe contener al menos 8 caracteres',
            showConfirmButton: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
      }
      if(valid && this.dataRegister.pass != this.dataRegister.passR){
        valid = false
        this.$swal({
            type: 'error',
            icon: 'error',
            timer: 3000,
            timerProgressBar: true,
            title: 'Las contraseñas no coinciden',
            showConfirmButton: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
      }
      if (this.dataRegister.name != '' && this.dataRegister.lastName != '' && this.dataRegister.email != '' && this.dataRegister.pass != '' && valid) {
          axios.post(endPoint.endpointTarget+'/clients/register',{
            name:this.MaysPrimera(this.dataRegister.name.toLowerCase()),
            lastName:this.MaysPrimera(this.dataRegister.lastName.toLowerCase()),
            mail:this.dataRegister.email.toLowerCase(),
            pass:this.dataRegister.pass
        },this.configHeader)
        .then(res => {

            if (res.data.status == 'client create') {
                this.$swal({
                    type: 'success',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    timerProgressBar: true,
                    title: 'Registro exitoso, ya puedes ingresar',
                    showConfirmButton: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                this.register = false
            }
            if (res.data.status == 'client exist') {
                this.$swal({
                    type: 'error',
                    icon: 'error',
                    timer: 3000,
                    timerProgressBar: true,
                    title: 'Este correo ya se encuentra registrado',
                    showConfirmButton: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            }
            
            
        })
      }
      else{
        this.$swal({
                    type: 'error',
                    icon: 'error',
                    timer: 3000,
                    timerProgressBar: true,
                    title: 'Debes rellenar todos los datos',
                    showConfirmButton: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
      }
    },
    MaysPrimera(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    login(){
      if (this.pass != '' && this.email != '') {
          axios.post(endPoint.endpointTarget+'/clients/login',{
            mail:this.email.toLowerCase(),
            pass:this.pass
          },this.configHeader)
          .then(res => {

              if (res.data.status == 'client login') {
                  this.$swal({
                      type: 'success',
                      icon: 'success',
                      toast: true,
                      position: 'top-end',
                      timer: 3000,
                      timerProgressBar: true,
                      title: 'Ingreso exitoso',
                      showConfirmButton: false,
                      didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                  })
                  localStorage.setItem("status","log-in")
                  localStorage.setItem("clientMail",this.mail)
                  localStorage.setItem("clientName",res.data.name)
                  localStorage.setItem("clientlastName",res.data.lastName)
                  localStorage.setItem("clientId",res.data.id)
                  router.push("/")
              }
              if (res.data.status == 'client incorrect') {
                  this.$swal({
                      type: 'error',
                      icon: 'error',
                      timer: 3000,
                      timerProgressBar: true,
                      title: 'Este correo no se encuentra registrado',
                      showConfirmButton: false,
                      didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                  })
              }
              if (res.data.status == 'client blocked') {
                  this.$swal({
                      type: 'error',
                      icon: 'error',
                      timer: 3000,
                      timerProgressBar: true,
                      title: 'Usuario bloqueado',
                      showConfirmButton: false,
                      didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                  })
              }
              if (res.data.status == 'pass incorrect') {
                  this.$swal({
                      type: 'error',
                      icon: 'error',
                      timer: 3000,
                      timerProgressBar: true,
                      title: 'Contraseña incorrecta',
                      showConfirmButton: false,
                      didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                  })
              }
              
          })
        }
        else{
          this.$swal({
              type: 'error',
              icon: 'error',
              timer: 3000,
              timerProgressBar: true,
              title: 'Debe rellenar todos los campos',
              showConfirmButton: false,
              didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
        }
    }
  }
};
</script>
<style></style>
