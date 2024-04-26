<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useGradeStore } from '../stores';
import { studentType } from '../stores/student/type';
import taskOptions from '../stores/student/taskOptions';
import classList from '../stores/student/classList';
import { useRouter } from 'vue-router';

const router = useRouter();

const gradeStore = useGradeStore();

const $class = ref('前端技术');

const isSearch = ref<boolean>(false);
const value = ref<string>('');
const svgWidth = ref<number>(24);
const search = ref();
const optionValue1 = ref<string>('1');
const optionValue2 = ref<string>('');
const optionValue2Title = ref<string>('班级');

watch(optionValue2, (newVal) => {
    for (const item of classList) {
        if (item.value === newVal) {
            optionValue2Title.value = item.text;
            break;
        }
    }
})


watch(isSearch, (newValue) => {
    if (newValue) {
        svgWidth.value = 0;
        search.value.style.display = '';
        search.value.style.width = '100%';
    } else {
        search.value.style.display = 'none';
        svgWidth.value = 24;
        search.value.style.width = '0';
    }
})


const onCancel = () => {
    isSearch.value = false;
}

const onSearch = () => {

}

const list = ref<studentType[]>([]);
const sliceList = ref<Array<studentType[]>>([]);
const sliceListLen = computed(() => {
    return sliceList.value.length;
})
const currentPage = ref(1);

watch(list, () => {
    sliceList.value = [];
    const page = 10;
    for (let i = 0; i < list.value.length; i += page) {
        sliceList.value.push(list.value.slice(i, i + page));
    }
})


watchEffect(() => {
    if (optionValue2.value.length === 0) {
        list.value = gradeStore.students;
    } else {
        list.value = gradeStore.students.filter((item) => {
            return item.班级 === optionValue2.value;
        })
    }
})


onMounted(() => {
    list.value = gradeStore.students;
})

const activeNames = ref([]);

const handleRelink = (id: string) => {
    router.push({
        name: 'person',
        params: {
            id: id
        }
    });
}

</script>

<template>
    <div class="grade-page">
        <div class="header">
            <header>
                <p><span>课程：</span>{{ $class }}</p>
                <div ref="search" style="display: none; width: 0; transition: width 0.3s ease-out;">
                    <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch"
                        @cancel="onCancel" />
                </div>
                <svg @click="isSearch = true" :width="svgWidth" :height="24" viewBox="0 0 48 48" fill="none"
                    style="transition: width 0.3s ease-out;" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
                        fill="none" stroke="#000000" stroke-width="4" stroke-linejoin="round" />
                    <path
                        d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431"
                        stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M33.2216 33.2217L41.7069 41.707" stroke="#000000" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </header>
            <van-dropdown-menu active-color="#fc5185">
                <van-dropdown-item v-model="optionValue1" :options="taskOptions" />
                <van-dropdown-item :title="optionValue2Title" v-model="optionValue2" :options="classList" />
            </van-dropdown-menu>
        </div>
        <main>
            <van-collapse v-model="activeNames">
                <van-collapse-item v-for="item in sliceList[currentPage - 1]" :title="item.姓名" :name="item.学号">
                    <template #value>
                        <div v-if="item.得分[optionValue1] > 85" style="color: #3fc1c9;">{{ item.得分[optionValue1] }}分
                        </div>
                        <div v-else-if="item.得分[optionValue1] <= 65" style="color: #fc5185;">{{ item.得分[optionValue1]
                            }}分
                        </div>
                        <div v-else style="color: #364f6b;">{{ item.得分[optionValue1]
                            }}分
                        </div>
                    </template>
                    <div class="content">
                        <p>学号：{{ item.学号 }}</p>
                        <p>班级：{{ item.班级 }}</p>
                        <p>作品：<a class="link" :href="item.链接">{{ item.链接 }}</a></p>
                        <p>个人页面：<span class="relink" @click="handleRelink(item.学号)">跳转</span></p>
                    </div>
                </van-collapse-item>
            </van-collapse>
            <div class="footer">
                <van-pagination v-model="currentPage" :total-items="sliceListLen * 10"
                    :show-page-size="sliceListLen < 5 ? sliceListLen : 5">
                    <template #prev-text>
                        <van-icon name="arrow-left" />
                    </template>
                    <template #next-text>
                        <van-icon name="arrow" />
                    </template>
                    <template #page="{ text }">{{ text }}</template>
                </van-pagination>
            </div>
        </main>
    </div>
</template>

<style scoped lnag="less">
.grade-page {
    height: 100dvh;
    width: 100%;
    overflow: hidden;
    position: relative;

    .header {
        height: 15dvh;
        display: flex;
        flex-direction: column;
    }

    header {
        height: 8dvh;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;

        background-color: var(--main-fr-color);
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            white-space: nowrap;
            font-size: 3dvh;
            color: #000000;
            line-height: 4dvh;
            overflow: hidden;
            display: flex;
            align-items: center;

            span {
                flex-wrap: nowrap;
                color: #f5f5f5;
                font-size: 4dvh;
                font-weight: 600;
            }
        }
    }

    main {
        height: calc(100% - 15dvh);
        position: relative;
        padding: 10px 20px;
        box-sizing: border-box;
        overflow: auto;
    }

}

.content {
    p {
        color: #000000;
        font-size: 2dvh;
    }

    .link,
    .relink {
        color: #008d81;
        cursor: pointer;

        &:visited {
            color: #f06464;
        }
    }

}

.footer {
    margin-top: 5dvh;
}
</style>