<template>
  <div class="studentContainer">
    <img class="studentAvatar" v-bind:src="student.photo" alt="">
    <div class="infoContainer">
      <h2>{{student.name}}</h2>
      <div class="detailedInfo">
        <div>Группа: {{student.group}}</div>
        <div>Оценка: {{student.mark}}</div>
        <div>{{student.isDonePr ? 'Здав': 'Не здав'}}</div>
      </div>
    </div>
    <span>{{getCount}}</span>
  </div>

</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

export default {
  props:{
    id: '',
  },
  data: function (){
    return {
      student: {},
    };
  },
  mounted: function () {
    axios.get("http://46.101.212.195:3000/students/"+this.id).then((responce) => {
      console.log(responce.data)
      this.student = responce.data;

    })

    // let responce = await axios.get("http://46.101.212.195:3000/students");
    // console.log(responce.data)
    // this.students = responce.data
    // this.$store.commit('setCount',this.students.length)
  },
  computed: {
    getCount () {
      return this.$store.getters.getCount
    }
  }
}

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
.studentContainer{
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #2c3e50;
  color: white;
  width: 600px;
  border-radius: 20px;
  justify-content:flex-start;
  padding: 20px 30px;
  cursor: pointer;
  user-select: none;
}
.studentAvatar{
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 20%;
}
.infoContainer{
  margin-top: 20px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.detailedInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}
.btn {
  font-size: 16px;
  padding: 6px 10px;
  border: 0;
  border-radius: 15px;
  background-color: gray;
  color: white;
  outline: none;
}

</style>