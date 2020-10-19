import Vue from 'vue'
import axios from 'axios'

new Vue({
    el: '#app',
    data: {
        findStudent: "",
        amount: 0,
        from: 0,
        to: 0,
        convert: 0,
        students: [],
        money: [],
    },
    mounted: function () {
        axios.get("http://46.101.212.195:3000/students").then((response) => {
            this.students = response.data;
        })

        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response) => {
            this.money = response.data;
        })
    },
    methods: {
        deleteStudent: function () {
            myTable.addEventListener('click', function (evt) {
                if (evt.target.closest('.deleteStudent')) {
                    evt.target.closest('tr').remove()
                }
            })
        },

        /*currentCalc: function (from, to, amount) {
            const {from, to, amount} = this.convert;
            if (!from || !to ) return ;
            console.log("From: ", from, "To: ", to, "Amount: ", amount )
        }*/
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
})