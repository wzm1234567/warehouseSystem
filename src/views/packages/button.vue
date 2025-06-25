<template>
    <div style="display: flex;justify-content: space-around;">
        <z-button bgColor="pink">BUTTON</z-button>
        <z3d-button>BUTTON</z3d-button>
    </div>
</template>
<script>
import zButton from "@/components/common/zButton";
import z3dButton from "@/components/common/z3dButton.vue"
export default {
    components: {
        zButton, z3dButton
    },
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped></style>