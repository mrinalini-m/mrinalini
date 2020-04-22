<template>
	<div class="tictactoe">
		<div class="players" id="players">
			<h1>Enter players:</h1>
			<div class="player">
				<label for="player-1">Player 1: </label>
				<input type="text" name="player-1" id="player-1" />
			</div>
			<div class="player">
				<label for="player-2">Player 2: </label>
				<input type="text" name="player-2" id="player-2" />
			</div>
			<button id="start" @click="handleClickStart" class="btn">Start</button>
		</div>
		<div id="game"></div>
	</div>
</template>

<script>
	// Writing a vue component so it can be transformed with vue-remark and embedded into the md.
	import TicTacToe from './tictactoe.js'
	export default {
		name: 'Tic-tac-toe',
		methods: {
			handleClickStart() {
				const p1 = document.querySelector('#player-1').value || 'player 1',
					p2 = document.querySelector('#player-2').value || 'player 2'

				const game = new TicTacToe(p1, p2)
				document.querySelector('#game').style.display = 'block'
				game.init()
				document.querySelector('#players').style.display = 'none'
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url('./style.css');
	.tictactoe {
		text-align: center;
		font-size: 1rem;
		padding: 3rem 0;
		font-family: sans-serif;
		#game {
			margin: 0 auto;
		}
		.players {
			margin-top: 0;
			h1 {
				text-align: center;
				margin: 1rem 0;
			}
		}
	}
</style>
