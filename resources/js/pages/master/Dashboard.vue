<template>
    <span>
        <master-navbar/>

        <master-card-view/>
        
        <master-footer/>
    </span>
</template>

<script>
import MasterCardView from '../../components/master/CardView'
import MasterFooter from '../../components/master/Footer'
import MasterNavbar from '../../components/master/Navbar'

export default {
    components: {
        MasterCardView,
        MasterFooter,
        MasterNavbar,
    }
}
</script>