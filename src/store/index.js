import { createStore } from 'vuex'
import instance from '../axios';

export default createStore({
  state: {
    wines: [],
    wine: "",
  },

  getters: {
    getWines: (state) => {
      return state.wines
    },
    getWine: (state) => {
      return state.wine
    },
  },

  mutations: {

    SET_WINES: function (state, wines) {
      state.wines = wines;
    },
    SET_WINE: function (state, wine) {
      state.wine = wine;
    },

  },

  actions: {

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
    }
  },

  modules: {
  }
})
