<template>
    <div class="inputView">
        <div class="title">通过给label位移移动到input上方 并且给label添加背景颜色挡住input边框</div>
        <div class="container">
            <div class="inputGroup">
                <input type="text" required="" autocomplete="off" placeholder="输入用户名">
                <label for="name">用户名</label>
            </div>
            <div class="inputGroup">
                <input type="text" required="" autocomplete="off" placeholder="输入密码">
                <label for="name">密码</label>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
// 原理：通过给label位移移动到input上方 并且给label添加背景颜色挡住input边框
.inputView {
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.container {
    width: 500px;
    height: 260px;
    background-color: #212121;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.inputGroup {
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0 1.5em 0;
    max-width: 190px;
    position: relative;
}

.inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 20px;
    width: 100%;
    color: #fff;
}

.inputGroup label {
    font-size: 100%;
    position: absolute;
    left: 0;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #fff;


}

.inputGroup:is(input:focus, input:valid)~label {
    transform: translateY(-200%) scale(.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: #212121;
}

.inputGroup:is(input:focus, input:valid) {
    border-color: rgb(150, 150, 200);
}

input::placeholder {
    color: #fff;
    font-size: 12px;
    text-align: center;
    opacity: 0.8;
}
</style>