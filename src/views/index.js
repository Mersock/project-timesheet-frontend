import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Index() {
  const history = useHistory();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if(!accessToken){
      history.push('/signin')
    }else{
      history.push('/admin/dashboard')
    }
  }, [])
  
  
  return [];
}

export default Index;
