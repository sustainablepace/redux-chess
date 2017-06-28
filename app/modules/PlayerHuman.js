class PlayerHuman {
    constructor() {
        this.createAction = (from, to) => {
            return {
                type: "pieceMoved",
                move: {
                    from: from,
                    to: to,
                    promotion: 'q' // always promote to queen for simplicity's sake
                }
            };
        };
    }
}

export default PlayerHuman;