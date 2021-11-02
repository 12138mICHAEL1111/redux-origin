import React ,{useContext,useState,useEffect}from "react";
const appContext = React.createContext(null)
let state = undefined
let reducer = undefined
let listeners = []
const setState = (newState) =>{
    state = newState
    listeners.forEach(element => {
        element()
    });  // 当setstate后执行一遍所有订阅里的更新函数
}
const createStore = (_reducer , inintState)=>{
    state = inintState
    reducer = _reducer
    return store
}
const _dispatch = (action)=>{
    setState(reducer(state,action))
}
const store = {
    getState(){
        return state
    },
    dispatch:(action)=>{  //默认接受一个对象
        console.log(action)
        if(action instanceof Function){ //处理异步 如果dispatch是一个function 就去执行该函数
            action()(_dispatch)
        }else{
            console.log(action)
            _dispatch(action)
        }
    },
    subscribe(fn){
    listeners.push(fn)
      return ()=>{
          const index = listeners.indexOf(fn)
            listeners.splice(index,1)
      }
    },
  }


  const changed = (oldState,newState)=>{
    let changed = false
    for(let  key in oldState){
    if(oldState[key] !== newState[key]){
            changed = true
        }
    }
    return changed 
  }

//封装子组件来为子组件提供dispatch方法 和state数据
//高阶函数 接受一个组件作为参数，返回好另一个封装好的组件
const connect = (selector,dispatcherSelector)=>(Component)=>{
    const Wrapper = (props)=>{ 
    // const {state,setState} = useContext(appContext)
      const [,update] = useState({}) //用于重新渲染页面
      const data = selector? selector(state) :{state} //获取state下面的一个特定的值 
      const dispatcher = dispatcherSelector? dispatcherSelector(store.dispatch) : {dispatch:store.dispatch} //获取特定的action封装在dispatch里
      useEffect(()=>{
        const unsubscribe = store.subscribe(()=>{ //添加到listener数组里 避免渲染没用到redux的组件
            const newData = selector? selector(state) :{state} //store里的data已经被dispatch更新了 所以是新数据
            console.log(newData)
            const isChanged = changed(data,newData) //这里的data是老数据 因为还没update()
            if(isChanged){ //新老数据变化了才重新渲染改组件 精准渲染 state里的一个值变了 不会造成依赖另一个值的组件发生渲染
                update({})
            }
        }) //初始化的时候把update函数添加给listener数组
        return unsubscribe //selector变化后先删除数组里对应的原方法，不然有多次订阅，造成多次渲染
      },[selector])
        return (<Component {...props} {...dispatcher} {...data} ></Component>)
      }
      return Wrapper
  }
  // dispatch =>  reducer里创建一个新的state => 调用store里的setstate方法 => setstate方法会把新的state赋值给老的state=>
  // 执行listerner中的每个方法 => listner中的方法在connect组件中的useeffect里定义 比较新老数据，数据发生改变，调用usestate里的setstate函数，重新渲染组件

  const Provider  = ({store,children})=>{ //封装provider
      return (
        <appContext.Provider value={store}>
            {children}
        </appContext.Provider>
      )
  }

  export {appContext,connect,createStore,Provider}