import { connect } from "../redux/redux"
import { fetchAction } from "../action/action"
const _ModifyUser =({state,x,updateUser,getRandom})=>{ 
    console.log(222)
    const changeValue =(e)=>{
      updateUser({name:e.target.value}) 
    }
    const onClick=(e)=>{
      console.log(1)
      getRandom(fetchAction)
    }
    return(
      <div>
        {x}
        <input value = {state.user.name}
        onChange = {changeValue}></input>
        <button onClick={onClick}>随机</button>
      </div>
    )
  }
  
  
 export default connect(null , (dispatch)=>{ //dispatch就是connect里定义的方法
    return{
      updateUser:(obj)=>{dispatch({actionType:'updateUser',payload:obj})},//传入action获取封装好的dispatch方法
      getRandom:(fn) => dispatch(fn) 
    }
  })(_ModifyUser)