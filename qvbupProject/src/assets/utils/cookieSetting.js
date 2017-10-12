/**
 * Created by hasee-pc on 2017/9/12.
 */
global.token='';
global.username='';
global.url='http://192.168.1.128/futurdata/public/api/v2/';
if(window.localStorage.getItem("token")){
  global.token=window.localStorage.getItem("token");
  global.username=window.localStorage.getItem("username");

}

