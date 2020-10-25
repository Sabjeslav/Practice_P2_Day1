<template>
  <div>
    <table id="myTable">
      <tr>
        <th>Фото</th>
        <th>Ім'я студента</th>
        <th>Група</th>
        <th>Оцінка</th>
        <th>Здав / Не здав роботу</th>
        <th>Редагувати студента</th>
        <th>Видалити студента</th>
      </tr>
      <tr v-for="student in filteredList" v-bind:key="student._id" id="row">
        <td><img width="100px" height="100px" v-bind:src="student.photo" alt=""></td>

        <template v-if="student._id==editId">
          <td><input type="text" v-model="student.name" value="student.name"></td>
          <td><input type="text" v-model="student.group" value="student.group"></td>
          <td><input type="number" v-model="student.mark" value="student.mark"></td>
          <template v-if="student.isDonePr===true">
            <td><input type="checkbox" checked v-model="student.isDonePr"></td>
          </template>
          <template v-else>
            <td><input type="checkbox" v-model="student.isDonePr"></td>
          </template>
          <td class="deleteStudent"><input type="button" @click="updateStudent(editId)" value="Зберегти"></td>
        </template>

        <template v-else>
          <td>
            <router-link v-bind:to="'/student-info/'+student._id">{{ student.name }}</router-link>
          </td>
          <td>{{ student.group }}</td>
          <td>{{ student.mark }}</td>
          <td><input type="checkbox" name="isDone" v-if="student.isDonePr===true" checked disabled><input
              type="checkbox" name="isDone" v-else disabled>
          </td>
          <td class="deleteStudent"><input type="button" @click="editForm(student._id)" value="Редагувати"></td>
          <td class="deleteStudent"><input type="button" @click="deleteStudent(student._id)" value="Видалити"></td>
        </template>

      </tr>
    </table>

    <input id="stud" type="text" v-model="findStudent" placeholder="Enter students name">

    <div class="addBlock">
      <span>Ім'я студента: </span>
      <input type="text" placeholder="Name" v-model="addedStudent.name" required>
      <br>
      <span>Група: </span>
      <input type="text" v-model="addedStudent.group">
      <br>
      <span>Оцінка: </span>
      <input type="number" min="1" max="5" v-model="addedStudent.mark" required>
      <br>
      <span>Здав / Не здав роботу: </span>
      <input type="checkbox" v-model="addedStudent.isDonePr" required>
      <br>

      <input type="button" value="Додати" @click="addStudent">
    </div>


    <div class="addBlock">
      <input type="number" v-model="number" v-on:change="roundNumber(number)"><br>
      <span>Number: {{ this.roundedNumber }}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  props: {
    id: "",
  },
  data: function () {
    return {
      findStudent: "",
      students: [],
      editId: "",
      addedStudent: {},
      number: null,
      roundedNumber: null
    };
  },
  mounted: function () {
    axios.get("http://46.101.212.195:3000/students").then((response) => {
      console.log(response.data);
      this.students = response.data;
    })
  },
  methods: {
    deleteStudent: function (id) {
      myTable.addEventListener('click', function (evt) {
        if (evt.target.closest('.deleteStudent')) {
          evt.target.closest('tr').remove()
        }
      })
      axios.delete(`http://46.101.212.195:3000/students/${id}`).then((response) => {
        console.log(response.data);
      })
    },
    addStudent: function () {
      axios.post("http://46.101.212.195:3000/students", this.addedStudent).then((response) => {
        console.log(response.data);
        this.students.push(response.data);
      })
    },
    editForm: function (id) {
      this.editId = id;
    },
    updateStudent: function (id) {
      let foundStudent = this.students.find((element) => {
        return element._id === id;
      });
      axios.put("http://46.101.212.195:3000/students/" + id, {
        name: foundStudent.name,
        group: foundStudent.group,
        mark: foundStudent.mark,
        isDonePr: foundStudent.isDonePr
      })
      this.editId = 0;
    },
    roundNumber: function (number) {
      this.roundedNumber = (parseInt(number * 100)) / 100;
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

.addBlock {
  width: 100vw;
  height: 15vh;
  border: 1px solid black;
  margin-top: 1%;
}

select {
  outline: none;
}
</style>
