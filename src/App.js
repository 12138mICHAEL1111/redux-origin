import React from "react";
import {Provider} from "./redux/redux";
import { store } from "./store/store";
import User from './components/user'
import ModifyUser from './components/modifyUser'
import Group from './components/group'


const Child = ()=> <div>这是第一个child<User/></div>

const GrandChild =()=> (<div>这是一个grandchild<ModifyUser x={'hello'}/></div>)

const GrandGrandChild =()=>(<div>这是grandgrandchild<Group/></div>)

function App() {
  return (
    <div>
      <Provider store={store}>
      <Child/>
      <hr></hr>
      <GrandChild></GrandChild>
      <hr></hr>
      <GrandGrandChild></GrandGrandChild>
      </Provider>
    </div>
  );
}

export default App;
