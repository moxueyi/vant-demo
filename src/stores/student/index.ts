import { defineStore } from "pinia";
import { studentType } from "./type";
import { ref } from "vue";
import data from './student.json';

const useGradeStore = defineStore("grade", () => {

    const students = ref<studentType[]>(data);

    const getPerson = (id: string) => {

        for (const item of students.value) {
            if (item.学号 === id) {
                return item;
            }
        }
        return null;
    }

    return {
        students,
        getPerson,
    }
})

export default useGradeStore;