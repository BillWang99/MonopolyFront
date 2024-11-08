<script setup>
    //sweet alert
    import Swal from 'sweetalert2';
    import axios from 'axios';
    import {ref} from 'vue';
import router from '@/router';

    //遊玩人數
    const playersNumber = ref(''); 

    //過濾遊玩人數
    const handleInput = () => {
        playersNumber.value = playersNumber.value.replace(/[^0-9]/g, '');
        if(playersNumber.value >= 11){
            playersNumber.value = '';
            Swal.fire({
                title: 'Error!',
                text: '不建議超過10人',
                icon: 'error',
                confirmButtonText: '知道了'
            });
        }
    };

    //新增遊戲
    const createNewGame = async(playersNumber) => {
        try{
            const response = await axios.post('http://monopoly.com.tw/api/GameHistory',JSON.stringify(playersNumber),{
                headers:{
                    'Content-Type': 'application/json',
                }
            }); 

            //跳轉畫面
            const token = response.data;
            router.push({name:'playground', params:{token:token}});
        }catch(error){
            console.log(error);
        }
    }
</script>

<template>
    <div class="container mt-5 w-50">
        <h3 class="text-center fw-bold">輸入遊玩人數</h3>
        <input 
            type="text" 
            class="form-control w-50 mx-auto" 
            v-model = playersNumber 
            @input="handleInput()"
            placeholder="請輸入整數">
        <br>
        <button 
            class="btn btn-primary d-block mx-auto"
            @click="createNewGame(playersNumber)">開始遊戲</button>
    </div>
</template>