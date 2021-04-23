import { db } from './firebase';
import utils from './utils'

const api = {
    room: {},
    game: {},
    wordBank: {}
};

const generateRoomId = () => {
    return utils.Random.letters(4);
}
const generateUserId = () => {
    return utils.Random.number(1_000_000);
}
const generateGameId = () => {
    return utils.Random.number(1_000_000);
}

api.room.create = async (username) => {
    const roomId = generateRoomId();
    const userId = generateUserId();
    await db.ref(`rooms/${roomId}`).set({
        hostUserId: userId,
        users: {
            [userId]: {
                username
            }
        }
    });

    const response = await api.game.create(roomId);

    //or update the store? //nah this is just the api
    return {
        error: null,
        data: {
            username,
            roomId,
            userId,
            ...response.data
        }
    }

    //Utils.Cookies.set(Utils.Constants.CookieNames.userId, userId);
    //Utils.Cookies.set(Utils.Constants.CookieNames.username, username);
}

api.room.join = async (roomId, username) => {
    const roomExists = await db.ref(`rooms`).once("value").then(snap => snap.child(roomId).exists());

    console.log(roomExists);

    if(!roomExists){
        return {
            error: new Error("No such room"),
            data: null
        }
    }

    const userId = generateUserId();
    await db.ref(`rooms/${roomId}/users/${userId}`).set({
        username
    });

    return {
        error: null,
        data: {
            userId
        }
    }

    //Utils.Cookies.set(Utils.Constants.CookieNames.userId, userId);
}

api.room.get = async (roomId) => {
    const room = await db.ref(`rooms/${roomId}`).once("value").then(snap => snap.val());
    return {
        error: null,
        data: room
    }
}

api.wordBank.get = async () => {
    const snap = await db.ref(`allWords`).once("value");
    const words = snap.val();
    return words;
}

api.wordBank.addMany = async (words) => {
    await db.ref().child(`allWords`).set(words);
}

api.game.create = async (roomId) => {
    const gameId = generateGameId();
    const allWords = await api.wordBank.get();
    const firstTeam = utils.Random.bool() ? 1 : 2;
    const secondTeam = firstTeam === 1 ? 2 : 1;
    const gameWords = allWords
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 25)
                        .map((w, i) => ({
                            text: w.text,
                            revealed: false,
                            type: (i < 7) ? 0 : (i < 16) ? firstTeam : (i < 24) ? secondTeam : 3
                        }))
                        .sort(() => Math.random() - 0.5)

    await db.ref(`rooms/${roomId}/games/${gameId}`).set({
        words: gameWords
    });

    await db.ref(`rooms/${roomId}`).child("currentGameId").set(gameId);

    return {
        error: null,
        data: {
            roomId,
            gameId
        }
    }
}

api.game.get = async (roomId, gameId) => {
    const game = await db.ref(`rooms/${roomId}/games/${gameId}`).once("value").then(snap => snap.val());
    console.log(roomId, gameId, game);
    return {
        error: null,
        data: {
            currentGameId: gameId,
            gameState: game
        }
    }
}

api.game.revealWord = async (roomId, gameId, wordIndex) => {
    return db.ref(`rooms/${roomId}/games/${gameId}/words/${wordIndex}/revealed`).set(true);
}



//listeners




let onGameChangeHandler = null;
api.game.onGameChange = (roomId, fn) => {
    onGameChangeHandler = (snap) => {
        const val = snap.val();
        fn(val);
    }
    db.ref(`rooms/${roomId}/currentGameId`).on("value", onGameChangeHandler);
}
api.game.offGameChange = (roomId) => {
    db.ref(`rooms/${roomId}/currentGameId`).off("value", onGameChangeHandler);
}



let onWordChangeHandler = null;
api.game.onWordChange = (roomId, gameId, fn) => {
    onWordChangeHandler = (snap) => {
        const val = snap.val();
        fn(val);
    }
    db.ref(`rooms/${roomId}/games/${gameId}/words`).on("child_changed", onWordChangeHandler);
}
api.game.offWordChange = (roomId, gameId) => {
    db.ref(`rooms/${roomId}/games/${gameId}/words`).off("child_changed", onWordChangeHandler);
}

export default api;