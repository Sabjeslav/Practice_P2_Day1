<template>
  <div>
    <table id="myTable">
      <tr>
        <th>Ім'я студента</th>
        <th>Група</th>
        <th>Дата народження</th>
        <th>Здав / Не здав роботу</th>
        <th>Видалити студента</th>
      </tr>
      <tr v-for="student in filteredList" v-bind:key="student._id" id="row">
        <td>{{ student.name }}</td>
        <td>{{ student.group }}</td>
        <td>{{ student.birthDate }}</td>
        <td><input type="checkbox" name="isDone" v-if="student.bool===true" checked disabled>
          <input type="checkbox" name="isDone" v-else disabled></td>
        <td class="deleteStudent"><input type="button" @click="deleteStudent" value="Видалити"></td>
      </tr>
    </table>

    <input id="stud" type="text" v-model="findStudent" placeholder="Enter students name">
    <!--<div class="calc">
   <span style="font-weight: bold; font-family: 'Century Gothic'">Конвертер валют</span>
   <br><br>
   <span> Конвертувати із: </span>
   <select name="convertFrom" id="1" v-model="from">
       <option value="" v-for="current in money">{{ current.ccy }}</option>
   </select>
   <br>
   <span>Конвертувати в : </span>
   <select name="convertTo" id="2" v-model="to">
       <option value="" v-for="current in money">{{ current.ccy }}</option>
   </select>
   <br>
   <br>
   <span>Кількість валюти:  </span><input type="text" v-model="amount" required onchange="currentCalc(from, to, amount)">

  </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  data: function () {
    return {
      findStudent: "",
      amount: 0,
      from: 0,
      to: 0,
      convert: 0,
      students: [],
      money: []
    };
  },
  mounted: function () {
    axios.get("http://46.101.212.195:3000/students").then((response) => {
      console.log(response.data)
      this.students = response.data;
    })
  },
  methods: {
    deleteStudent: function () {
      myTable.addEventListener('click', function (evt) {
        if (evt.target.closest('.deleteStudent')) {
          evt.target.closest('tr').remove()
        }
      })
    }
  },
  computed: {
    filteredList: function () {
      let stud = this.findStudent;
      return this.students.filter(function (elem) {
        if (stud === "") return true;
        else return elem.name.indexOf(stud) > -1;
      })
    }
  }
}
</script>
<style scoped>

table {
  width: 100vw;
  text-align: center;
}

th {
  background-color: #ffdf6d;
}

table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid black;
  width: 20%;
}

#stud {
  margin-top: 1%;
  border: 3px solid #2b9cff;
  border-radius: 10px;
  height: 25px;
  outline: none;
}

.deleteStudent {
  cursor: pointer;
}

.calc {
  width: 100vw;
  height: 15vh;
  border: 1px solid black;
  margin-top: 1%;
}

select {
  outline: none;
}
</style>
