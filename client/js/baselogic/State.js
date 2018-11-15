// TODO: figure out if you need/want this class

export default class State {
    constructor(state) {
        this.views = state.views;

        this.player = state.player;
        this.score = state.score;

        this.coins = state.coins;
        this.maxCoins = state.maxCoins;
    }
}