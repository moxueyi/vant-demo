<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGradeStore } from '../stores';
import { useRoute } from 'vue-router';
import { studentType } from '../stores/student/type';

const route = useRoute();

const personStore = useGradeStore();
const pesrson = ref<studentType>();

const value = ref('')

const onSearch = (_val: string) => {

}

const activeNames = ref([]);

const show = ref(false);
onMounted(() => {
    if (route.params.id) {
        pesrson.value = personStore.getPerson(route.params.id as string)!;
    } else {
        pesrson.value = personStore.students[0];
    }
})


</script>

<template>
    <div class="person-page">
        <div class="header">
            <van-collapse v-model="activeNames">
                <van-collapse-item>
                    <template #title>
                        <div class="title">
                            <span>课程：</span>{{ "前端技术" }}
                        </div>
                    </template>
                    <template #default>
                        <van-search v-model="value" :clearable="true" placeholder="请输入搜索关键词" @search="onSearch" />
                    </template>

                    <template #right-icon>
                        <svg width="24" :height="24" viewBox="0 0 48 48" fill="none"
                            style="transition: width 0.3s ease-out;" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
                                fill="none" stroke="#000000" stroke-width="4" stroke-linejoin="round" />
                            <path
                                d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431"
                                stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M33.2216 33.2217L41.7069 41.707" stroke="#000000" stroke-width="4"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </template>
                </van-collapse-item>
            </van-collapse>
            <div class="profile">
                <p @click="show = !show"><van-icon name="manager" />{{ pesrson?.姓名 }}</p>
                <van-popup v-model:show="show" position="top" :style="{ height: 'auto' }">
                    <div class="popup">
                        <p>姓名：{{ pesrson?.姓名 }}</p>
                        <p>学号：{{ pesrson?.学号 }}</p>
                        <p>班级：{{ pesrson?.班级 }}</p>
                    </div>
                </van-popup>
                <van-button type="warning" size="small" color="#ff2e63">退出</van-button>
            </div>
        </div>
        <main>
            <div class="content-header">
                <div>
                    <p>任务</p>
                    <p>得分</p>
                    <p>完成情况</p>
                </div>
            </div>
            <div class="content-body">
                <div class="content-item" v-for="(item, key) of pesrson?.得分">
                    <p>{{ key }}</p>
                    <p>{{ item < 0 ? '' : item }}</p>
                            <p>{{ item < 0 ? "未完成" : "已完成" }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped lang="less">
.person-page {
    height: 100dvh;
    width: 100dvw;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    flex-direction: column;

    .title {
        font-size: 3dvh;
        color: #000000;
        line-height: 4dvh;
        overflow: hidden;
        display: flex;
        align-items: center;

        span {
            color: #252a34;
            font-size: 4dvh;
            font-weight: 600;
        }

    }

    .profile {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: #eaeaea;
        padding: 10px;

        p {
            font-size: 3dvh;
            color: #000000;
            line-height: 4dvh;

            cursor: pointer;
        }

    }
}

.popup {
    display: grid;
    padding: 10px 20px;
    justify-content: center;
}

main {
    flex: 1;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;

    .content-header {
        display: grid;
        place-items: center;
        padding: 10px 0;

        background: #a8d8ea;
        border-radius: 10px 10px 0 0;

        div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 80%;

            font-weight: 600;
            font-size: 2.5dvh;
        }
    }

    .content-body {
        display: grid;
        place-items: center;
        overflow: auto;
        background-color: #ffe2e2;
        border-radius: 0 0 10px 10px;

        .content-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 80%;
            padding: 10px 10px;

            &:not(:last-child) {
                border-bottom: 2px solid #f9f7f7;
            }

        }
    }

}
</style>
