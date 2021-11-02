import { createStore } from "../redux/redux"
import { reducer } from "../reducer/reducer"
const initstate = {
    user:{name:'aaa',age:18},
    group:{name:"前端"}
  }
  
  
const store = createStore(reducer,initstate)

export {store}