//reducer用于创建一个新的state
const reducer =  (state ,{actionType,payload})=>{
    console.log(actionType)
    switch (actionType){
      case 'updateUser':{
        return{
          ...state,
          user:{
            ...state.user,
            ...payload
          }
        }
      }
      default:return state
    }
  }

export {reducer}