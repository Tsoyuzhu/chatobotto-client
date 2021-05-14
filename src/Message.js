
// Better to define in a file for larger projects
const greetings = [
    "has joined the chat. 10/10 auto-tests passed! You are awesome!!",
    "has joined the chat. Ohaiyogozaimasu~ o w o",
    "has joined the chat. * Looks around nervously *",
    "* teleports behind you *",
    "has joined the chat. Watashi is excited to see you! * blush *",
    "has joined the chat. Ehe.",
    "has come to talk about anime.",
    "has come to watch some Haikyu",
    "has joined the chat. Their favourite anime is Sailor moon",
    "has joined the chat. Their favourite anime is pokemon.",
    "has joined the chat. They have come to join the chat"
]

const getJoinMessage = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
}

const goodbyes = [
    "has left the chat like a loser ಠ▃ಠ.",
    "has left the chat.",
    "has left the chatteroni pepperoni.",
    "has gone like the wind...",
    "left to go to sleep like a weakling.",
    "left to go watch anime.",
    "has gone to go feed their dog.",
    "has left to feed their cat.",
    "has left to feed their komodo dragon.",
    "has left to feed their pet earth worm."
]

const getLeaveMessage = () => {
    return goodbyes[Math.floor(Math.random() * goodbyes.length)];
}

module.exports = {
    getJoinMessage,
    getLeaveMessage
}