const actions={
    changeA(context,isA){
        context.commit('changeA',isA)
    },
    changeB(context,isB){
        context.commit('changeB',isB)      
    }
}
export default actions;