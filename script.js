function uber (){
    console.log("The uber is on way...")
}
function ready (callback){
    console.log("Here you go!")
    setTimeout(callback, 2000)
}
ready(uber)


function LongestWord (large){
  
    const words = large.replace(/[^a-zA-Z0-9\s]/g, '').split(" ")
    let longestWord = ""
    for(let i = 0;i<words.length;i++){
        const recentWord = words[i]
        if(recentWord.length >longestWord.length){
            longestWord = recentWord
        }
    }
    return longestWord
}
  const sentence = "I love reading books"
console.log(LongestWord(sentence))