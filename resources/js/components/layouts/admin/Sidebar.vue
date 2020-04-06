<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <router-link tag="a" exact :to="{name: 'admin.dashboard'}" class="sidebar-brand d-flex align-items-center justify-content-center" >
            <div class="sidebar-brand-icon">
                <i class="fas fa-hamburger fa-lg"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Burguers </div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <router-link tag="a" exact :to="{name: 'admin.dashboard'}"  class="nav-link">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Administração
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <router-link tag="a" exact :to="{name: 'admin.orders'}"  class="nav-link">
            <i class="fas fa-shopping-cart"></i>
            <span>Pedidos</span></router-link>
        </li>

        <li class="nav-item">
            <router-link tag="a" exact :to="{name: 'admin.users'}"  class="nav-link">
            <i class="fas fa-user-friends"></i>
            <span>Usuários</span></router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Cardápio
        </div>

        <li class="nav-item">
            <router-link tag="a" exact :to="{name: 'admin.drinks'}"  class="nav-link">
            <i class="fas fa-cocktail"></i>
            <span>Bebidas</span></router-link>
        </li>
        
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBurguers" aria-expanded="true" aria-controls="collapseBurguers">
            <i class="fas fa-hamburger"></i>
            <span> Hambúrguers</span>
            </a>
            <div id="collapseBurguers" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link tag="a" exact :to="{name: 'admin.ingredients'}" class="collapse-item">Ingredientes</router-link>
                    <router-link tag="a" exact :to="{name: 'admin.burguers'}" class="collapse-item">Hambúrguers</router-link>
                </div>
            </div>
        </li>
        
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSnacks" aria-expanded="true" aria-controls="collapseSnacks">
            <i class="fas fa-utensils"></i>
            <span> Lanches</span>
            </a>
            <div id="collapseSnacks" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link tag="a" exact :to="{name: 'admin.categories'}" class="collapse-item">Categorias de lanches</router-link>
                    <router-link tag="a" exact :to="{name: 'admin.snacks'}" class="collapse-item">Lanches</router-link>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
    <!-- End of Sidebar -->
</template>