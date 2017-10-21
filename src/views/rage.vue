<template>
        <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>
