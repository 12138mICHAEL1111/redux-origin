const fetchAction =()=>{
    return (dispatch )=>fetch('https://random-data-api.com/api/food/random_food').then((res)=>{
      return res.json() 
    }).then((res)=>{    
      console.log(res.dish)
      dispatch({
          actionType:'updateUser',
          payload:{name:res.dish}
      })
    }).catch((error)=>{console.log(error)})
  }

export {fetchAction}