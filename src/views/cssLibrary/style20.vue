<template>
    <div class="style20">
        <div class="content">
            <h1 class="title">
                前端Hardy
                <div class="lighting">
                    <div class="item_ele"></div>
                    <div class="item_ele"></div>
                    <div class="item_ele"></div>
                    <div class="item_ele"></div>
                </div>
            </h1>
        </div>
    </div>
</template>
<style lang="scss" scopedsa>
:root {
    --bgd: #000000;
    --clr-1: #1eb7e6;
    --clr-2: #0ee36a;
    --clr-3: #1039dd;
    --clr-4: #cf0bf2;
}

// .style20 {
//     height: 100%;
//     display: grid;
//     place-items: center;
//     // background-color: var(--bgd);
//     color: #fff;
//     font-family: "Inter", "DM Sans", Arial, sans-serif;
// }



.content {
    text-align: center;
}

.title {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 800;
    letter-spacing: clamp(-1.75px, -0.25vw, -3.5px);
    position: relative;
    overflow: hidden;
    background: var(--bgd);
    margin: 0;
    color: #fff;
    // height: 600px;
}

.lighting {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    mix-blend-mode: darken;
    pointer-events: none;
}

.item_ele {
    overflow: hidden;
    position: absolute;
    width: 60vw;
    height: 60vw;
    background-color: var(--clr-1);
    border-radius: 37%29%27%27% / 28%25%41%37%;
    filter: blur(1rem);
    mix-blend-mode: overlay;
}

.item_ele:nth-of-type(1) {
    top: -50%;
    animation: lighting-border 6s ease-in-out infinite,
        lighting-112s ease-in-out infinite alternate;
}

.item_ele:nth-of-type(2) {
    right: 0;
    top: 0;
    background-color: var(--clr-3);
    animation: lighting-border 6s ease-in-out infinite,
        lighting-212s ease-in-out infinite alternate;
}

.item_ele:nth-of-type(3) {
    left: 0;
    bottom: 0;
    background-color: var(--clr-2);
    animation: lighting-border 6s ease-in-out infinite,
        lighting-38s ease-in-out infinite alternate;
}

.item_ele:nth-of-type(4) {
    right: 0;
    bottom: -50%;
    background-color: var(--clr-4);
    animation: lighting-border 6s ease-in-out infinite,
        lighting-424s ease-in-out infinite alternate;
}

@keyframes lighting-1 {
    0% {
        top: 0;
        right: 0;
    }

    50% {
        top: 100%;
        right: 75%;
    }

    75% {
        top: 100%;
        right: 25%;
    }

    100% {
        top: 0;
        right: 0;
    }
}

@keyframes lighting-2 {
    0% {
        top: -50%;
        left: 0;
    }

    60% {
        top: 100%;
        left: 75%;
    }

    85% {
        top: 100%;
        left: 25%;
    }

    100% {
        top: -50%;
        left: 0;
    }
}

@keyframes lighting-3 {
    0% {
        bottom: 0%;
        left: 0;
    }

    40% {
        bottom: 100%;
        left: 75%;
    }

    70% {
        bottom: 40%;
        left: 50%;
    }

    100% {
        bottom: 0%;
        left: 0;
    }
}

@keyframes lighting-4 {
    0% {
        bottom: -50%;
        right: 0;
    }

    50% {
        bottom: 0%;
        right: 40%;
    }

    90% {
        bottom: 50%;
        right: 25%;
    }

    100% {
        bottom: -50%;
        right: 0;
    }
}

@keyframes lighting-border {
    0% {
        border-radius: 37%29%27%27% / 28%25%41%37%;
    }

    25% {
        border-radius: 47%29%39%49% / 61%19%66%26%;
    }

    50% {
        border-radius: 57%23%47%72% / 63%17%66%33%;
    }

    75% {
        border-radius: 28%49%29%100% / 93%20%64%25%;
    }

    100% {
        border-radius: 37%29%27%27% / 28%25%41%37%;
    }
}
</style>