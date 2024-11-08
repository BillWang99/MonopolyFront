<script setup>
    import {ref, onMounted} from 'vue';
    import axios from 'axios'
    import { useRoute } from 'vue-router';

    const route = useRoute();
    
    //遊戲token
    const GameToken = route.params.token;
    console.log(GameToken);

    //表單資料
    const formData = ({
        token:'',
        Order:'',
        optionMethod:'',
        money:''
    });

    //玩家
    const players = ref({});

    //取得回合資料
    const fetchData = async()=>{
        try{
            const response = await axios.get('http://monopoly.com.tw/api/players/'+GameToken);
            players.value = response.data;
        }catch(error){
            console.log(error);
        }
    }

    //取得表單資料
    const send = async(order)=>{
        //組合資料
        formData.Order = order;
        formData.token = GameToken;
        //post data
        try{
            const response = await axios.post('http://monopoly.com.tw/api/RoundData', JSON.stringify(formData), {
                headers:{
                    'Content-Type': 'application/json',
                }
            });
        }catch(error){
            console.log(error);
        }finally{
            location.reload();
        }
        console.log(formData);
    }

    onMounted(()=>{
        fetchData();
    });
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3" v-for="p in players" :key="p.id">
                <div class="card  mt-3 mx-2" v-bind:class="p.isTarget?'border-warning':null">
                    <div class="card-body " >
                        <h3 class="card-title fw-bold text-center"><i v-if="p.isTarget" class="bi bi-caret-right-fill text-warning"></i>玩家{{p.order}}</h3>
                        <p class="card-text fw-bold text-center">目前金額:{{ p.money }}</p>
                        <div class="text-center" v-if="p.isTarget">
                            <input type="radio" name="optionMethod" v-model="formData.optionMethod" value="spand" >支出
                            <input type="radio" name="optionMethod" class="ms-2" v-model="formData.optionMethod" value="income">收入<br>
                            <input type="text" class="form-control mt-2" v-model="formData.money" placeholder="輸入金額">
                        </div>
                        <div class="d-grid gap-2 mt-2" v-if="p.isTarget">
                            <button class="btn btn-primary d-block w-100" @click="send(p.order)">送出</button>
                            <button class="btn btn-secondary d-block" >下一位</button>
                        </div>
                        <div class="loader mx-auto mt-5" v-else></div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
