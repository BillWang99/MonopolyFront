<script setup>
    import {onMounted, ref} from 'vue';
    import axios from 'axios';
    import router from '@/router';
    import Swal from 'sweetalert2';
    import loader from './loader.vue';

    const data = ref({});

    const loading = ref(true);

    const fetchData = async()=>{
        try{
            const response = await axios.get('http://monopoly.com.tw/api/GameHistory'); 
            data.value = response.data;
            console.log(data.value)
        }catch(error){
            console.log(error);
        }finally{
            loading.value = false;
        }
    }

    const toPlayground = (token)=>{
        router.push({name:'playground', params:{token:token}});
    }

    const deleteGame = async(id) =>{
        const result = await
        Swal.fire({
            title: "確定刪除此紀錄?",
            confirmButtonColor:'red',
            showCancelButton: true,
            confirmButtonText: "刪除",
            cancelButtonText:"取消"
        });

        if (result.isConfirmed) {
                try{
                    await axios.put('http://monopoly.com.tw/api/gamehistory/'+id, {
                        headers:{
                            'Content-Type': 'application/json',
                        }
                    })
                }catch(error){

                }finally{
                    location.reload();
                }
        }
    }

    onMounted(()=>{
        fetchData();
    })
</script>

<template>
    <div class="loadingarea" v-if="loading">
        <loader/>
    </div>
    
    <div class="container mt-5" v-else>
        <h3 class="text-center fw-bold">遊戲紀錄</h3>

        <table class="table align-middle mx-auto text-center table-borderless" v-if="data.length">
            <thead>
                <tr>
                    <th>建立日期</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in data" :key="item.id">
                    <td class="col-6">{{ item.createTime }}</td>
                    <td class="col-6">
                        <button class="btn btn-success me-1" @click="toPlayground(item.gameToken)">繼續</button>
                        <button class="btn btn-outline-danger" @click="deleteGame(item.id)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
    .loadingarea{
        position: fixed; /* 固定在螢幕上 */
         top: 0;
         left: 0;
         width: 100%; 
         height: 100%; 
         display: flex; 
         justify-content: center; 
         align-items: center; 
         
         z-index: 9999; /* 保證在最上層 */
    }
    .container{
        width: 100%;
    }
  @media (min-width:701px){
    .table { 
            max-width:50%; 
        }
  }

   @media (max-width: 700px)  { 
        .table { 
            width:100%; 
        }
    }
</style>