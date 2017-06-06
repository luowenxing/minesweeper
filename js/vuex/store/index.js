import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '../mutations'
import { GameStatus } from '../model/status'

Vue.use(Vuex) 
const mines = 10
const mapWidth = 10
const mapHeight = 10
const gameStatus = GameStatus.Waiting
const sweepers = mines
const map = []

export default new Vuex.Store({
	state: {
		map,
		sweepers,
		mines,
		mapWidth,
		mapHeight,
		gameStatus,
		time:0
	},
	mutations,
})