export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
export function getScore(score, curr) {
    if (curr.selectedAnswerId === curr.correctAnswerId) {
        return score + 1
    }
    return score
}