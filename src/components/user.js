import { connect} from "../redux/redux";
import React from "react";
const _User = ({user})=>{
    console.log(111)
    return (
      <div>User:{user.name}</div>
    )
}

export default connect((state)=>{ //state为全局的state
    return {user:state.user}
})(_User)