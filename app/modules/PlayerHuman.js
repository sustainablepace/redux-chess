class PlayerHuman {
    constructor() {
        this.move = (dispatch, from, to) => {
            dispatch({
                type: "move",
                move: {
                    from: from,
                    to: to,
                    promotion: 'q' // always promote to queen for simplicity's sake
                }
            });
        };
    }
}

export default PlayerHuman;