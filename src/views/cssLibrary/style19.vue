<template>
    <div class="style19">
        <div class="price-table">
            <!-- <div class="price-card">
                <h2 class="price-card__title">Basic</h2>
                <div class="price-card__ribbon">
                    <span class="price-card__ribbon-text">¥3.</span>
                    <span class="price-card__ribbon-text-highlight">99</span>
                </div>
                <div class="price-card__info">
                    <p> 1 User</p>
                    <p> 1 Project</p>
                    <p> 2GB Disk Space</p>
                    <p> Standard Support</p>
                </div>
            </div> -->
            <div class="price-card price-card--highlight">
                <h2 class="price-card__title">Advanced</h2>
                <div class="price-card__ribbon"> <span class="price-card__ribbon-text">¥8.<span
                            class="price-card__ribbon-text-highlight">99</span> </span> </div>
                <div class="price-card__info">
                    <p>25 Users</p>
                    <p>Unlimited Projects</p>
                    <p>10GB Disk Space</p>
                    <p>Standard Support</p>
                </div>
            </div>
            <!-- <div class="price-card">
                <h2 class="price-card__title">Premium</h2>
                <div class="price-card__ribbon"> <span class="price-card__ribbon-text"></span> ¥15.<span
                        class="price-card__ribbon-text-highlight">99</span> </div>
                <div class="price-card__info">
                    <p>100 Users</p>
                    <p>Unlimited Projects</p>
                    <p>50GB Disk Space</p>
                    <p>Premium Support</p>
                </div>
            </div> -->
        </div>
    </div>
</template>
<style lang="scss" scoped>
:root {
    --c-ribbon: #2f2f2f;
    --c-ribbon-shadow: #666;
    --c-ribbon-text: #efefef;
    --c-title: #2f2f2f;
}

.style19 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #ddd;
}

.price-table {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.price-card {
    color: #555;
    background-color: #fff;
    width: 25%;
    aspect-ratio: 9/14.5;
    min-width: 12rem;
    max-width: 15rem;
    text-align: center;
    margin: 0 2rem;
    margin: 0.5rem 0 1rem;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
    cursor: pointer;
}

.price-card:hover {
    transform: translateY(-20px);
}

.price-card__ribbon {
    position: relative;
    padding: 2rem 1rem;
    margin: 2rem -0.8rem 2rem;
    background-color: var(--c-ribbon);
    transform: skew(0, -10deg);
    border-radius: 3px 0;
    box-shadow: 0 2rem 1.2rem -2rem var(--c-ribbon-shadow);
}

.price-card__ribbon::before,
.price-card__ribbon::after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
}

.price-card__ribbon::before {
    border-width: 0 0.8rem 0.8rem 0;
    border-color: transparent var(--c-ribbon-shadow) transparent transparent;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
}

.price-card__ribbon::after {
    border-width: 0.8rem 0 0 0.8rem;
    border-color: transparent transparent transparent var(--c-ribbon-shadow);
    right: 0;
    top: 0;
    transform: translateY(-100%);
}

.price-card__ribbon-text {
    color: var(--c-ribbon-text);
    font-size: 2rem;
    line-height: 1.4;
    font-weight: 700;
    display: block;
    transform: skew(0, 10deg);
}

.price-card__ribbon-text-highlight {
    color: yellow;
    font-size: 0.5em;
}

.price-card__title {
    color: var(--c-title);
}

.price-card--highlight {
    --c-ribbon: #f94289;
    --c-ribbon-text: #fff;
    --c-ribbon-shadow: #ff619b;
    --c-title: #f94289;
    box-shadow: 0 0 3rem -1.5rem rgba(0, 0, 0, 0.5);
}

.price-card__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.price-card__info p {
    font-size: 0.4em;
}
</style>