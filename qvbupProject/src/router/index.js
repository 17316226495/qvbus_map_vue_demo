import Vue from 'vue'
import Router from 'vue-router'

import Appointment from '../components/appointment'
import Selectcity from '../components/selectCity'
import Selectseat from '../components/selectSeat'
import PassengerInfo from '../components/passengerInfo'
import AddPerson from '../components/addPerson'
import ScanResult from '../components/scanResult'
import OrderDetail from '../components/orderDetail'
import Home from '../components/Home.vue'
import Map from '../components/map.vue'
import Login from '../components/login'
import MapMain from '../components/mapMain'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/'
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path: '',
          redirect: '/home/appointment'
        },
        {
          path: 'appointment',
          name: 'Appointment',
          component: Appointment
        },
        {
          path: 'map',
          name: 'Map',
          component: Map
        },
      ]
    },
    {
      path: '/mapmain',
      name: 'MapMain',
      component: MapMain
    },
    {
      path: '/login',
      name:'Login',
      component: Login,
    },
    {
      path: '/selectcity/:cityname',
      name:'Selectcity',
      component: Selectcity,
    },
    {
      path: '/selectseat/:sumSeat/:startdata/:starttime/:price/:lineid',
      name:'Selectseat',
      component: Selectseat
    },
    {
      path: '/passengerInfo/:ids/:price/:lineid',
      name:'PassengerInfo',
      component: PassengerInfo
    },
    {
      path: '/addPerson/:id/:idCard/:phone/:username',
      name:'AddPerson',
      component: AddPerson
    },
    {
      path: '/scanresult/:amount/:producelineid/:contratid',
      name:'ScanResult',
      component: ScanResult
    },
    {
      path: '/orderDetail/:parentid',
      name:'OrderDetail',
      component: OrderDetail
    },
  ]
});

