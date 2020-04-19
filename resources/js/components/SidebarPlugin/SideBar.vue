<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
                              </span>
                            </div>
                        </a>

                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Meu perfil</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Opções</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <button @click="logout" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Sair</span>
                        </button>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">Cardápio</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                      <sidebar-item :link="{name: 'Bebidas', icon: 'fas fa-beer mr-3 text-yellow', path: '/orders'}"/>
                    </li>
                    <li class="nav-item">
                      <sidebar-item :link="{name: 'Categorias de lanches', icon: 'fas fa-poll-h mr-3 text-green', path: '/orders'}"/>
                    </li>
                    <li class="nav-item">
                      <sidebar-item :link="{name: 'Lanches', icon: 'fas fa-pizza-slice mr-3 text-orange', path: '/orders'}"/>
                    </li>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">Hambúrguers</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <sidebar-item :link="{name: 'Ingredientes', icon: 'fas fa-bacon mr-3 text-blue', path: '/orders'}"/>
                    </li>
                    <li class="nav-item">
                        <sidebar-item :link="{name: 'Hambúrguers', icon: 'fas fa-hamburger mr-3 text-orange', path: '/orders'}"/>
                    </li>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">Documentação</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <a class="nav-link"
                           href="https://demos.creative-tim.com/vue-argon-dashboard/documentation">
                            <i class="ni ni-spaceship"></i> Iniciando
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/foundation/colors.html">
                            <i class="ni ni-palette"></i> Foundation
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/components/alerts.html">
                            <i class="ni ni-ui-04"></i> Componentes
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '../NavbarToggleButton'
  /** mixins */
  import logout from '../../mixins/logout'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    },
    mixins: [logout]
  };
</script>
