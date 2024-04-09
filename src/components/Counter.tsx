import { defineComponent, ref } from '@rexar/core';

export const Counter = defineComponent(()=> {
    const count$ = ref(0);
    const inc = ()=>{
        count$.value+=1;
    }
    return <button onClick={inc} >Count is {count$}</button>
})