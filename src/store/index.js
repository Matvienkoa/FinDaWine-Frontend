import { createStore } from 'vuex'
import instance from '../axios';
const jwt = require('jsonwebtoken');

export default createStore({
  state: {
    user: "",
    admin: "",
    wines: [],
    wine: "",
    barCode: "",
  },

  getters: {
    getUser: (state) => {
      return state.user
    },
    getAdmin: (state) => {
      return state.admin
    },
    getWines: (state) => {
      return state.wines
    },
    getWine: (state) => {
      return state.wine
    },
    getBarCode: (state) => {
      return state.barCode
    }
  },

  mutations: {
    LOG_OUT: function (state) {
      state.user = "",
      state.admin = "",
      localStorage.removeItem('token');
    },
    SET_USER: function (state, user) {
      state.user = user
    },
    SET_ADMIN: function (state, admin) {
      state.admin = admin
    },
    SET_WINES: function (state, wines) {
      state.wines = wines;
    },
    SET_WINE: function (state, wine) {
      state.wine = wine;
    },
    SET_BARCODE: function (state, barCode) {
      state.barCode = barCode
    }
  },

  actions: {
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/findawine/auth/login', userInfos)
          .then(function (response) {
            if(response.data.token){
            commit('SET_USER', response.data);
            localStorage.setItem('token', response.data.token);
            resolve(response);
          }
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    getIfAdmin: ({commit}) => {
      const token = localStorage.getItem("token");
      if(token) {
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        instance.get(`/findawine/auth/${userId}`)
        .then(function (response) {
          commit('SET_ADMIN', response.data);
          commit('SET_USER', {token, userId})
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    getAllWines: ({ commit }) => {
      instance.get('findawine/wines')
      .then((response) => {
        commit('SET_WINES', response.data);
      })
      .catch((response) => {
        console.log(response);
      })
    },
    getOneWine: ({ commit }, wineId) => {
      instance.get(`findawine/wines/${wineId}`)
      .then((response) => {
        commit('SET_WINE', response.data);
      })
      .catch((response) => {
        console.log(response);
      })
    },
    addProduct: (file) => {
      instance.post('findawine/wines/', file,
      {'content-type' : 'application/form-data'})
      .then((response) => {
          console.log(response)
      })
      .catch(error => {
        console.log({ error: error })
      })
    }
  }
})
