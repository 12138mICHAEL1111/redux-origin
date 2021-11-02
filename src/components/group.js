import { connect } from "../redux/redux"
export  default connect((state)=>{ //state就是store里的state
    return {group:state.group}
  })(({group})=>{ 
    console.log(333)
    return (<div>group: {group.name}</div>)
  })