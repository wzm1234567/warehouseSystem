<template>
  <div class="container">
    <button @click="getapi">get</button>
    <button @click="postapi">post</button>
    <button @click="deleteapi">delete</button>
    <button @click="captcha">captcha</button>
    <div v-html="svg"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      svg: "",
    };
  },
  methods: {
    getapi() {
      axios.get("http://127.0.0.1:3000/api/get?id=10").then((res) => {
        console.log(res);
      });
    },
    postapi() {
      axios.post("http://127.0.0.1:3000/api/post", { id: 66 }).then((res) => {
        console.log(res);
      });
    },
    deleteapi() {
      axios
        .delete("http://127.0.0.1:3000/api/delete", { id: 77 })
        .then((res) => {
          console.log(res);
        });
    },
    captcha(){
      axios.get("http://127.0.0.1:3000/login/captcha").then((res)=>{
        console.log(res)
        this.svg = res.data.data
      })
    }
  },
  created() {},
};
</script>
