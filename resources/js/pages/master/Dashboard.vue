<template>
    <span>
        <master-navbar/>

        <master-footer/>
    </span>

</template>

<script>
import MasterNavbar from '../../components/master/Navbar'
import MasterFooter from '../../components/master/Footer'

export default {
    components: {
        MasterNavbar,
        MasterFooter
    }
}
</script>