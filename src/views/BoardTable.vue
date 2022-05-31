<template>

<div>
    <NavBar/>
    <b-container fluid="md" style="margin-top:2rem; margin-bottom:2rem;">
        <b-card-group deck >
            <b-card title="게시글" header-tag="header" footer-tag="footer">
                <b-button href="#" variant="primary">상세보기</b-button>
            </b-card>
            <b-card title="게시글" header-tag="header" footer-tag="footer">
                <b-button href="#" variant="primary">상세보기</b-button>
            </b-card>
        </b-card-group>
    </b-container>
    <Footer/>
</div>

</template>
<script>
import NavBar from "../components/layout/NavBar.vue"
import Footer from "../components/layout/FooterBar.vue"
export default {
    components:{
        NavBar,
        Footer
    }
}
</script>