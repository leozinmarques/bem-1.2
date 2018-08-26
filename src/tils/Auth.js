import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export {setToken, getToken, getPapel, isAdmin, isLoggedIn,logout};

  function  setToken(token){
    sessionStorage.setItem('token', token);
    var config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    axios.get('https://bemapi.herokuapp.com/usuario', config)
    .then(res => {
      sessionStorage.setItem('papel_id', res.data.papel_id);
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  function isLoggedIn(){
    if(sessionStorage.getItem('token') != null){
      return true;
    }
    return false;
  }

  function logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('papel_id');
    <Redirect to='./'/>
  }

  function getToken(token){
    return sessionStorage.getItem('token');
  }

  function getPapel(token){
    return sessionStorage.getItem('papel_id');
  }

  function isAdmin(){
    if(sessionStorage.getItem('papel_id') == 1){
      return true
    }
    return false;
  }

  function isPsicologo(){
    if(sessionStorage.getItem('papel_id') == 2){
      return true
    }
    return false;
  }
