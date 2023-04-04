<template>
    <div class="backgroundVideo">
        <div class="videoContainer">
            <video class="fullscreenVideo" id="bgVid" playsinline="" autoplay="" muted="" loop=""
                v-on:canplay="canplay">
                <source src="../assets/leave.mp4" type="video/mp4">
            </video>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        canplay() {
            this.vedioCanPlay = true
        }
    },
}
</script>
<style scoped>
.videoContainer {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -100;
}

.videoContainer:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
    top: 0;
    left: 0;
}

.fullscreenVideo {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    -webkit-transition: 1s opacity;
    transition: 1s opacity;
}
</style>