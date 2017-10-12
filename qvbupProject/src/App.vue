<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style>
  @media only screen and (max-width: 320px){html{font-size: 9px;} }
  @media only screen and (min-width: 320px) and (max-width: 352px){html{font-size: 9px;} }
  @media only screen and (min-width: 352px) and (max-width: 384px){html{font-size: 10px;} }
  @media only screen and (min-width: 384px) and (max-width: 416px){html{font-size: 11px;} }
  @media only screen and (min-width: 416px) and (max-width: 448px){html{font-size: 12px;} }
  @media only screen and (min-width: 448px) and (max-width: 480px){html{font-size: 13px;} }
  @media only screen and (min-width: 480px) and (max-width: 512px){html{font-size: 14px;} }
  @media only screen and (min-width: 512px) and (max-width: 544px){html{font-size: 15px;} }
  @media only screen and (min-width: 544px) and (max-width: 576px){html{font-size: 16px;} }
  @media only screen and (min-width: 576px) and (max-width: 608px){html{font-size: 17px;} }
  @media only screen and (min-width: 608px) and (max-width: 640px){html{font-size: 18px;} }
  @media only screen and (min-width: 640px){html{font-size: 20px;} }
  /*相对于 375 写会很方便 10 rem的话就可以取整数*/
  *{
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
  }
  body,html{
    width: 100%;
    height: 100%;
  }
  a{
    color: #000;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
