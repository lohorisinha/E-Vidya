// Game State
let currentPosition = 1;
let questionsAnswered = 0;
let correctAnswers = 0;
let gameActive = false;
let waitingForAnswer = false;
let currentLanguage = 'en';

// Game Configuration
const SNAKES = [
    [16, 6], [47, 26], [49, 11], [56, 53], [62, 19], 
    [64, 60], [87, 24], [93, 73], [95, 75], [98, 78]
];

const LADDERS = [
    [1, 38], [4, 14], [9, 21], [21, 42], [28, 84], 
    [36, 44], [51, 67], [71, 91], [80, 100]
];

// Dice faces for 3D animation
const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// Language Translations
const translations = {
    en: {
        gameTitle: "Probability Quest",
        rollDice: "Roll Dice",
        position: "Position",
        questions: "Questions",
        instructionsTitle: "How to Play",
        instructions: [
            "Roll the dice to move on the board",
            "Answer probability questions correctly to advance",
            "Climb ladders to jump ahead",
            "Avoid snakes that will pull you back",
            "First to reach 100 wins!"
        ],
        questionTitle: "Probability Question",
        winTitle: "Congratulations!",
        winMessage: "You've completed the Probability Quest!",
        totalQuestionsLabel: "Questions Answered:",
        correctAnswersLabel: "Correct Answers:",
        accuracyLabel: "Accuracy:",
        playAgain: "Play Again",
        changeLanguage: "Change Language",
        correct: "Correct! Well done!",
        incorrect: "Incorrect. The correct answer was:",
        nextQuestion: "Next Question",
        legendTitle: "Game Guide",
        snakeLabel: "Snake - Goes Down",
        ladderLabel: "Ladder - Goes Up",
        playerLabel: "Your Position",
        snakePositionsTitle: "Snake Positions:",
        ladderPositionsTitle: "Ladder Positions:"
    },
    hi: {
        gameTitle: "प्रायिकता खोज",
        rollDice: "पासा फेंकें",
        position: "स्थिति",
        questions: "प्रश्न",
        instructionsTitle: "कैसे खेलें",
        instructions: [
            "बोर्ड पर चलने के लिए पासा फेंकें",
            "आगे बढ़ने के लिए प्रायिकता के प्रश्नों का सही उत्तर दें",
            "आगे बढ़ने के लिए सीढ़ियों पर चढ़ें",
            "सांपों से बचें जो आपको पीछे ले जाएंगे",
            "100 तक पहुंचने वाला पहला जीतता है!"
        ],
        questionTitle: "प्रायिकता प्रश्न",
        winTitle: "बधाई हो!",
        winMessage: "आपने प्रायिकता खोज पूरी की है!",
        totalQuestionsLabel: "उत्तर दिए गए प्रश्न:",
        correctAnswersLabel: "सही उत्तर:",
        accuracyLabel: "सटीकता:",
        playAgain: "फिर से खेलें",
        changeLanguage: "भाषा बदलें",
        correct: "सही! बहुत अच्छा!",
        incorrect: "गलत। सही उत्तर था:",
        nextQuestion: "अगला प्रश्न",
        legendTitle: "खेल गाइड",
        snakeLabel: "सांप - नीचे जाता है",
        ladderLabel: "सीढ़ी - ऊपर जाती है",
        playerLabel: "आपकी स्थिति",
        snakePositionsTitle: "सांप की स्थितियां:",
        ladderPositionsTitle: "सीढ़ी की स्थितियां:"
    },
    or: {
        gameTitle: "ସମ୍ଭାବନା ଅନ୍ୱେଷଣ",
        rollDice: "ପାସା ଫୋପାଡ଼ନ୍ତୁ",
        position: "ସ୍ଥାନ",
        questions: "ପ୍ରଶ୍ନ",
        instructionsTitle: "କିପରି ଖେଳିବେ",
        instructions: [
            "ବୋର୍ଡରେ ଚଳିବା ପାଇଁ ପାସା ଫୋପାଡ଼ନ୍ତୁ",
            "ଆଗକୁ ବଢ଼ିବା ପାଇଁ ସମ୍ଭାବନା ପ୍ରଶ୍ନର ସଠିକ ଉତ୍ତର ଦିଅନ୍ତୁ",
            "ଆଗକୁ ଡେଇଁବା ପାଇଁ ସିଡ଼ି ଚଢ଼ନ୍ତୁ",
            "ସାପମାନଙ୍କୁ ଏଡ଼ାନ୍ତୁ ଯେଉଁମାନେ ଆପଣଙ୍କୁ ପଛକୁ ଟାଣିବେ",
            "100 ରେ ପହଞ୍ଚିବା ପ୍ରଥମ ଜଣ ଜିତେ!"
        ],
        questionTitle: "ସମ୍ଭାବନା ପ୍ରଶ୍ନ",
        winTitle: "ଅଭିନନ୍ଦନ!",
        winMessage: "ଆପଣ ସମ୍ଭାବନା ଅନ୍ୱେଷଣ ସମ୍ପୂର୍ଣ୍ଣ କରିଛନ୍ତି!",
        totalQuestionsLabel: "ଉତ୍ତର ଦିଆଯାଇଥିବା ପ୍ରଶ୍ନ:",
        correctAnswersLabel: "ସଠିକ ଉତ୍ତର:",
        accuracyLabel: "ସଠିକତା:",
        playAgain: "ପୁନର୍ବାର ଖେଳନ୍ତୁ",
        changeLanguage: "ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ",
        correct: "ସଠିକ! ବହୁତ ଭଲ!",
        incorrect: "ଭୁଲ। ସଠିକ ଉତ୍ତର ଥିଲା:",
        nextQuestion: "ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ",
        legendTitle: "ଖେଳ ଗାଇଡ଼",
        snakeLabel: "ସାପ - ତଳକୁ ଯାଏ",
        ladderLabel: "ସିଡ଼ି - ଉପରକୁ ଯାଏ",
        playerLabel: "ଆପଣଙ୍କର ସ୍ଥାନ",
        snakePositionsTitle: "ସାପର ସ୍ଥାନ:",
        ladderPositionsTitle: "ସିଡ଼ି ସ୍ଥାନ:"
    }
};

// Question Bank
const questionBank = {
  en: [
    {
      question: "What is the probability of getting a head when flipping a fair coin?",
      options: ["1/2", "3/4", "1", "1/4"],
      correct: 0
    },
    {
      question: "What is the probability of rolling a 6 on a fair six-sided die?",
      options: ["1/3", "1/6", "2/3", "1/2"],
      correct: 1
    },
    {
      question: "If you draw a card from a standard deck, what's the probability it's a red card?",
      options: ["2/3", "1/2", "1/3", "1/4"],
      correct: 1
    },
    {
      question: "What is the probability of getting an even number when rolling a die?",
      options: ["1/2", "1/3", "2/3", "3/4"],
      correct: 0
    },
    {
      question: "In a bag with 3 red and 7 blue balls, what's the probability of drawing a red ball?",
      options: ["3/10", "7/10", "3/7", "1/3"],
      correct: 0
    },
    {
      question: "What is the probability of getting tails twice when flipping a coin twice?",
      options: ["1/2", "1/4", "1/8", "3/4"],
      correct: 1
    },
    {
      question: "If you roll two dice, what's the probability of getting a sum of 7?",
      options: ["1/9", "1/36", "1/6", "5/36"],
      correct: 2
    },
    {
      question: "What is the probability of drawing an ace from a standard deck of cards?",
      options: ["1/13", "1/26", "1/52", "4/52"],
      correct: 0
    },
    {
      question: "In 10 coin flips, what's the most likely number of heads?",
      options: ["7", "5", "3", "10"],
      correct: 1
    },
    {
      question: "What is the probability of getting at least one head in two coin flips?",
      options: ["3/4", "1/4", "1", "1/2"],
      correct: 0
    },
    {
      question: "What is the probability of rolling an odd number on a fair die?",
      options: ["1/3", "1/2", "3/4", "2/3"],
      correct: 1
    },
    {
      question: "If you pick a card, what's the probability it’s a face card (J, Q, K)?",
      options: ["3/13", "1/13", "1/4", "9/52"],
      correct: 0
    },
    {
      question: "What's the probability of getting both heads and tails in two coin flips?",
      options: ["1/2", "3/4", "1", "1/4"],
      correct: 0
    },
    {
      question: "What is the probability of drawing a black card from a deck?",
      options: ["1/2", "1/3", "1/4", "2/3"],
      correct: 0
    },
    {
      question: "If you roll two dice, what’s the probability both show even numbers?",
      options: ["1/6", "1/3", "1/2", "1/4"],
      correct: 3
    },
    {
      question: "What is the probability of not getting a 5 on a fair die?",
      options: ["5/6", "1/6", "2/3", "1/3"],
      correct: 0
    },
    {
      question: "A bag has 4 red and 6 green balls. Probability of green?",
      options: ["3/5", "2/3", "1/2", "3/4"],
      correct: 0
    },
    {
      question: "What is the probability of getting a prime number on a die?",
      options: ["1/2", "2/3", "1/3", "1/6"],
      correct: 0
    },
    {
      question: "If you flip 3 coins, probability of exactly 2 heads?",
      options: ["3/8", "1/8", "1/2", "1/4"],
      correct: 0
    },
    {
      question: "What is the probability of choosing a king from a deck?",
      options: ["1/13", "1/26", "1/12", "1/52"],
      correct: 0
    },
    {
      question: "If you roll two dice, probability both show the same number?",
      options: ["1/36", "1/12", "1/6", "1/18"],
      correct: 2
    },
    {
      question: "Probability of drawing a heart card from deck?",
      options: ["1/2", "1/4", "1/13", "1/26"],
      correct: 1
    },
    {
      question: "A bag has 5 blue, 3 red. Probability of red?",
      options: ["3/8", "5/8", "1/2", "1/3"],
      correct: 0
    },
    {
      question: "What is the probability of rolling a number greater than 4 on a die?",
      options: ["1/3", "1/6", "1/2", "2/3"],
      correct: 2
    },
    {
      question: "Probability of getting tails at least once in 3 flips?",
      options: ["7/8", "3/4", "1/4", "1/2"],
      correct: 0
    },
    {
      question: "Probability of drawing a queen or king from deck?",
      options: ["2/13", "1/26", "1/13", "1/52"],
      correct: 0
    },
    {
      question: "What is the probability of getting 0 heads in 2 flips?",
      options: ["1/2", "1/8", "3/4", "1/4"],
      correct: 3
    },
    {
      question: "If you roll 2 dice, probability of sum 11?",
      options: ["1/12", "1/36", "1/6", "1/18"],
      correct: 3
    },
    {
      question: "Probability of selecting a spade card?",
      options: ["1/26", "1/13", "1/4", "1/2"],
      correct: 2
    },
    {
      question: "Probability of rolling a composite number on die?",
      options: ["1/2", "1/3", "1/6", "2/3"],
      correct: 0
    },
    {
      question: "Probability of drawing a non-face card?",
      options: ["10/13", "3/4", "9/13", "1/2"],
      correct: 0
    },
    {
      question: "Probability of getting exactly 1 head in 2 flips?",
      options: ["3/4", "1/4", "1/2", "1/8"],
      correct: 2
    },
    {
      question: "Probability of selecting an even numbered card (2,4,...,10)?",
      options: ["1/3", "1/2", "5/13", "4/13"],
      correct: 2
    },
    {
      question: "Probability of rolling number ≤ 3 on a die?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 1
    },
    {
      question: "Probability of drawing a black queen?",
      options: ["1/26", "1/13", "1/52", "1/12"],
      correct: 0
    },
    {
      question: "If you flip 4 coins, probability of 4 heads?",
      options: ["1/2", "1/8", "1/4", "1/16"],
      correct: 3
    },
    {
      question: "Probability of selecting a red king?",
      options: ["1/26", "1/13", "2/13", "1/52"],
      correct: 0
    },
    {
      question: "Probability of rolling a number divisible by 2 or 3?",
      options: ["5/6", "2/3", "1/2", "1/3"],
      correct: 0
    },
    {
      question: "Probability of not drawing an ace?",
      options: ["12/13", "3/4", "48/52", "1/2"],
      correct: 0
    },
    {
      question: "Probability of rolling a perfect square on a die?",
      options: ["1/6", "1/2", "2/3", "1/3"],
      correct: 0
    },
    {
      question: "If you pick a card, probability it’s not a heart?",
      options: ["3/4", "1/4", "1/2", "2/3"],
      correct: 0
    },
    {
      question: "Probability of drawing a jack from deck?",
      options: ["1/26", "1/13", "1/52", "2/13"],
      correct: 1
    },
    {
      question: "If rolling 2 dice, probability of sum 2?",
      options: ["1/36", "1/12", "1/18", "1/6"],
      correct: 0
    },
    {
      question: "Probability of getting no tails in 3 flips?",
      options: ["1/4", "1/2", "1/8", "3/4"],
      correct: 2
    },
    {
      question: "Probability of rolling number >2 and <5 on die?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 0
    },
    {
      question: "Probability of drawing a diamond card?",
      options: ["1/26", "1/13", "1/4", "1/2"],
      correct: 2
    },
    {
      question: "Probability of selecting black ace?",
      options: ["1/26", "1/13", "2/13", "1/52"],
      correct: 0
    },
    {
      question: "If 2 dice rolled, probability of product even?",
      options: ["1/2", "1/3", "3/4", "1/4"],
      correct: 2
    },
    {
      question: "Probability of drawing a card higher than 10?",
      options: ["3/13", "1/4", "1/2", "2/13"],
      correct: 0
    },
    {
      question: "Probability of rolling prime number on die?",
      options: ["1/2", "1/3", "2/3", "1/4"],
      correct: 0
    },
    {
      question: "Probability of getting at least one head in 3 flips?",
      options: ["7/8", "3/4", "1/4", "1/2"],
      correct: 0
    }
  ],
  hi: [
    {
      question: "एक निष्पक्ष सिक्के को उछालने पर चित आने की प्रायिकता क्या है?",
      options: ["1/2", "3/4", "1", "1/4"],
      correct: 0
    },
    {
      question: "एक निष्पक्ष छह-पक्षीय पासे पर 6 आने की प्रायिकता क्या है?",
      options: ["1/3", "1/6", "2/3", "1/2"],
      correct: 1
    },
    {
      question: "यदि आप एक मानक डेक से एक कार्ड निकालते हैं, तो उसके लाल होने की प्रायिकता क्या है?",
      options: ["2/3", "1/2", "1/3", "1/4"],
      correct: 1
    },
    {
      question: "पासा फेंकने पर सम संख्या आने की प्रायिकता क्या है?",
      options: ["1/2", "1/3", "2/3", "3/4"],
      correct: 0
    },
    {
      question: "3 लाल और 7 नीली गेंदों वाले बैग में से लाल गेंद निकालने की प्रायिकता क्या है?",
      options: ["3/10", "7/10", "3/7", "1/3"],
      correct: 0
    },
    {
      question: "सिक्के को दो बार उछालने पर दोनों बार पट आने की प्रायिकता क्या है?",
      options: ["1/2", "1/4", "1/8", "3/4"],
      correct: 1
    },
    {
      question: "यदि आप दो पासे फेंकते हैं, तो योग 7 आने की प्रायिकता क्या है?",
      options: ["1/9", "1/36", "1/6", "5/36"],
      correct: 2
    },
    {
      question: "मानक कार्ड डेक से इक्का निकालने की प्रायिकता क्या है?",
      options: ["1/13", "1/26", "1/52", "4/52"],
      correct: 0
    },
    {
      question: "10 सिक्के उछालने पर, चित की सबसे संभावित संख्या क्या होगी?",
      options: ["7", "5", "3", "10"],
      correct: 1
    },
    {
      question: "दो सिक्के उछालने पर कम से कम एक बार चित आने की प्रायिकता क्या है?",
      options: ["3/4", "1/4", "1", "1/2"],
      correct: 0
    },
    {
      question: "निष्पक्ष पासे पर विषम संख्या आने की प्रायिकता क्या है?",
      options: ["1/3", "1/2", "3/4", "2/3"],
      correct: 1
    },
    {
      question: "यदि आप एक कार्ड चुनते हैं, तो उसके चित्र कार्ड (जे, क्यू, के) होने की प्रायिकता क्या है?",
      options: ["3/13", "1/13", "1/4", "9/52"],
      correct: 0
    },
    {
      question: "दो सिक्के उछालने पर एक चित और एक पट आने की प्रायिकता क्या है?",
      options: ["1/2", "3/4", "1", "1/4"],
      correct: 0
    },
    {
      question: "एक डेक से काला कार्ड निकालने की प्रायिकता क्या है?",
      options: ["1/2", "1/3", "1/4", "2/3"],
      correct: 0
    },
    {
      question: "यदि आप दो पासे फेंकते हैं, तो दोनों पर सम संख्या आने की प्रायिकता क्या है?",
      options: ["1/6", "1/3", "1/2", "1/4"],
      correct: 3
    },
    {
      question: "निष्पक्ष पासे पर 5 न आने की प्रायिकता क्या है?",
      options: ["5/6", "1/6", "2/3", "1/3"],
      correct: 0
    },
    {
      question: "4 लाल और 6 हरे गेंदों वाले बैग में से हरी गेंद निकालने की प्रायिकता क्या है?",
      options: ["3/5", "2/3", "1/2", "3/4"],
      correct: 0
    },
    {
      question: "पासे पर अभाज्य संख्या आने की प्रायिकता क्या है?",
      options: ["1/2", "2/3", "1/3", "1/6"],
      correct: 0
    },
    {
      question: "3 सिक्के उछालने पर ठीक 2 चित आने की प्रायिकता क्या है?",
      options: ["3/8", "1/8", "1/2", "1/4"],
      correct: 0
    },
    {
      question: "मानक कार्ड डेक से राजा निकालने की प्रायिकता क्या है?",
      options: ["1/13", "1/26", "1/12", "1/52"],
      correct: 0
    },
    {
      question: "यदि दो पासे फेंके जाएँ, तो दोनों पर समान संख्या आने की प्रायिकता क्या है?",
      options: ["1/36", "1/12", "1/6", "1/18"],
      correct: 2
    },
    {
      question: "डेक से दिल (♥) का कार्ड निकालने की प्रायिकता क्या है?",
      options: ["1/2", "1/4", "1/13", "1/26"],
      correct: 1
    },
    {
      question: "5 नीली और 3 लाल गेंदों वाले बैग में से लाल गेंद निकालने की प्रायिकता क्या है?",
      options: ["3/8", "5/8", "1/2", "1/3"],
      correct: 0
    },
    {
      question: "निष्पक्ष पासे पर 4 से बड़ी संख्या आने की प्रायिकता क्या है?",
      options: ["1/3", "1/6", "1/2", "2/3"],
      correct: 2
    },
    {
      question: "3 सिक्के उछालने पर कम से कम एक बार पट आने की प्रायिकता क्या है?",
      options: ["7/8", "3/4", "1/4", "1/2"],
      correct: 0
    },
    {
      question: "डेक से रानी या राजा निकालने की प्रायिकता क्या है?",
      options: ["2/13", "1/26", "1/13", "1/52"],
      correct: 0
    },
    {
      question: "दो सिक्के उछालने पर 0 चित आने की प्रायिकता क्या है?",
      options: ["1/2", "1/8", "3/4", "1/4"],
      correct: 3
    },
    {
      question: "यदि दो पासे फेंके जाएँ, तो योग 11 आने की प्रायिकता क्या है?",
      options: ["1/12", "1/36", "1/6", "1/18"],
      correct: 3
    },
    {
      question: "डेक से पान (♠) का कार्ड निकालने की प्रायिकता क्या है?",
      options: ["1/26", "1/13", "1/4", "1/2"],
      correct: 2
    },
    {
      question: "निष्पक्ष पासे पर संयुक्त संख्या आने की प्रायिकता क्या है?",
      options: ["1/2", "1/3", "1/6", "2/3"],
      correct: 0
    },
    {
      question: "डेक से गैर-चित्र कार्ड निकालने की प्रायिकता क्या है?",
      options: ["10/13", "3/4", "9/13", "1/2"],
      correct: 0
    },
    {
      question: "दो सिक्के उछालने पर ठीक 1 चित आने की प्रायिकता क्या है?",
      options: ["3/4", "1/4", "1/2", "1/8"],
      correct: 2
    },
    {
      question: "एक कार्ड चुनने पर सम संख्या (2,4,...,10) निकालने की प्रायिकता क्या है?",
      options: ["1/3", "1/2", "5/13", "4/13"],
      correct: 2
    },
    {
      question: "पासे पर ≤3 संख्या आने की प्रायिकता क्या है?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 1
    },
    {
      question: "डेक से काली रानी निकालने की प्रायिकता क्या है?",
      options: ["1/26", "1/13", "1/52", "1/12"],
      correct: 0
    },
    {
      question: "4 सिक्के उछालने पर सभी बार चित आने की प्रायिकता क्या है?",
      options: ["1/2", "1/8", "1/4", "1/16"],
      correct: 3
    },
    {
      question: "डेक से लाल राजा निकालने की प्रायिकता क्या है?",
      options: ["1/26", "1/13", "2/13", "1/52"],
      correct: 0
    },
    {
      question: "निष्पक्ष पासे पर 2 या 3 से विभाज्य संख्या आने की प्रायिकता क्या है?",
      options: ["5/6", "2/3", "1/2", "1/3"],
      correct: 0
    },
    {
      question: "डेक से इक्का न आने की प्रायिकता क्या है?",
      options: ["12/13", "3/4", "48/52", "1/2"],
      correct: 0
    },
    {
      question: "पासे पर पूर्ण वर्ग संख्या आने की प्रायिकता क्या है?",
      options: ["1/6", "1/2", "2/3", "1/3"],
      correct: 0
    },
    {
      question: "डेक से दिल (♥) न आने की प्रायिकता क्या है?",
      options: ["3/4", "1/4", "1/2", "2/3"],
      correct: 0
    },
    {
      question: "डेक से गुलाम (जैक) निकालने की प्रायिकता क्या है?",
      options: ["1/26", "1/13", "1/52", "2/13"],
      correct: 1
    },
    {
      question: "दो पासे फेंकने पर योग 2 आने की प्रायिकता क्या है?",
      options: ["1/36", "1/12", "1/18", "1/6"],
      correct: 0
    },
    {
      question: "3 सिक्के उछालने पर एक भी पट न आने की प्रायिकता क्या है?",
      options: ["1/4", "1/2", "1/8", "3/4"],
      correct: 2
    },
    {
      question: "निष्पक्ष पासे पर 2 से बड़ी और 5 से छोटी संख्या आने की प्रायिकता क्या है?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 0
    },
    {
      question: "डेक से ईंट (♦) का कार्ड निकालने की प्रायिकता क्या है?",
      options: ["1/26", "1/13", "1/4", "1/2"],
      correct: 2
    },
    {
      question: "डेक से काला इक्का निकालने की प्रायिकता क्या है?",
      options: ["1/26", "1/13", "2/13", "1/52"],
      correct: 0
    },
    {
      question: "दो पासे फेंकने पर उनका गुणनफल सम होने की प्रायिकता क्या है?",
      options: ["1/2", "1/3", "3/4", "1/4"],
      correct: 2
    },
    {
      question: "एक कार्ड चुनने पर 10 से बड़ी संख्या आने की प्रायिकता क्या है?",
      options: ["3/13", "1/4", "1/2", "2/13"],
      correct: 0
    },
    {
      question: "पासे पर अभाज्य संख्या आने की प्रायिकता क्या है?",
      options: ["1/2", "1/3", "2/3", "1/4"],
      correct: 0
    },
    {
      question: "3 सिक्के उछालने पर कम से कम एक बार चित आने की प्रायिकता क्या है?",
      options: ["7/8", "3/4", "1/4", "1/2"],
      correct: 0
    }
  ],
  or: [
    {
      question: "ଏକ ସମାନ ମୁଦ୍ରାକୁ ଫିଙ୍ଗିଲେ ଚିତ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "3/4", "1", "1/4"],
      correct: 0
    },
    {
      question: "ଏକ ସମାନ ଛଅ-ପାର୍ଶ୍ୱ ପାସାରେ 6 ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/3", "1/6", "2/3", "1/2"],
      correct: 1
    },
    {
      question: "ଏକ ସାଧାରଣ କାର୍ଡ ଡେକରୁ କାର୍ଡ ଟାଣିଲେ, ସେଥିରୁ ଲାଲ କାର୍ଡ ହେବାର ସମ୍ଭାବନା କେତେ?",
      options: ["2/3", "1/2", "1/3", "1/4"],
      correct: 1
    },
    {
      question: "ପାସା ଫିଙ୍ଗିଲେ ସମ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/3", "2/3", "3/4"],
      correct: 0
    },
    {
      question: "3ଟି ଲାଲ ଓ 7ଟି ନୀଳ ବଲ୍ ଥିବା ବ୍ୟାଗରୁ ଲାଲ ବଲ୍ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/10", "7/10", "3/7", "1/3"],
      correct: 0
    },
    {
      question: "ମୁଦ୍ରାକୁ ଦୁଇଥର ଫିଙ୍ଗିଲେ, ଦୁଇଥର ପଟ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/4", "1/8", "3/4"],
      correct: 1
    },
    {
      question: "ଦୁଇଟି ପାସା ଫିଙ୍ଗିଲେ, ଯୋଗ 7 ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/9", "1/36", "1/6", "5/36"],
      correct: 2
    },
    {
      question: "ଏକ ଡେକରୁ ଏସ୍ କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/13", "1/26", "1/52", "4/52"],
      correct: 0
    },
    {
      question: "10ଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, ସର୍ବାଧିକ ସମ୍ଭାବ୍ୟ ଚିତ ସଂଖ୍ୟା କେତେ?",
      options: ["7", "5", "3", "10"],
      correct: 1
    },
    {
      question: "ଦୁଇଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, କମରେ କମ 1ଥର ଚିତ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/4", "1/4", "1", "1/2"],
      correct: 0
    },
    {
      question: "ଏକ ପାସାରେ ବିଷମ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/3", "1/2", "3/4", "2/3"],
      correct: 1
    },
    {
      question: "କାର୍ଡ ଡେକରୁ ଏକ କାର୍ଡ ଟାଣିଲେ, ସେଥିରେ ମୁହଁ କାର୍ଡ (ଜେ, କ୍ୟୁ, କେ) ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/13", "1/13", "1/4", "9/52"],
      correct: 0
    },
    {
      question: "ଦୁଇଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, ଏକ ଚିତ ଓ ଏକ ପଟ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "3/4", "1", "1/4"],
      correct: 0
    },
    {
      question: "ଡେକରୁ କଳା କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/3", "1/4", "2/3"],
      correct: 0
    },
    {
      question: "ଦୁଇଟି ପାସା ଫିଙ୍ଗିଲେ, ଦୁଇଟିରେ ସମ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/6", "1/3", "1/2", "1/4"],
      correct: 3
    },
    {
      question: "ପାସା ଫିଙ୍ଗିଲେ 5 ନ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["5/6", "1/6", "2/3", "1/3"],
      correct: 0
    },
    {
      question: "4ଟି ଲାଲ ଓ 6ଟି ସବୁଜ ବଲ୍ ଥିବା ବ୍ୟାଗରୁ ସବୁଜ ବଲ୍ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/5", "2/3", "1/2", "3/4"],
      correct: 0
    },
    {
      question: "ପାସାରେ ଅଭାଜ୍ୟ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "2/3", "1/3", "1/6"],
      correct: 0
    },
    {
      question: "3ଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, ଠିକ୍ 2ଥର ଚିତ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/8", "1/8", "1/2", "1/4"],
      correct: 0
    },
    {
      question: "ଡେକରୁ ରାଜା କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/13", "1/26", "1/12", "1/52"],
      correct: 0
    },
    {
      question: "ଦୁଇଟି ପାସା ଫିଙ୍ଗିଲେ, ଦୁଇଟିରେ ସମାନ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/36", "1/12", "1/6", "1/18"],
      correct: 2
    },
    {
      question: "ଡେକରୁ ହାର୍ଟ (♥) କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/4", "1/13", "1/26"],
      correct: 1
    },
    {
      question: "5ଟି ନୀଳ ଓ 3ଟି ଲାଲ ବଲ୍ ଥିବା ବ୍ୟାଗରୁ ଲାଲ ବଲ୍ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/8", "5/8", "1/2", "1/3"],
      correct: 0
    },
    {
      question: "ପାସା ଫିଙ୍ଗିଲେ 4ରୁ ବଡ଼ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/3", "1/6", "1/2", "2/3"],
      correct: 2
    },
    {
      question: "3ଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, କମରେ କମ 1ଥର ପଟ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["7/8", "3/4", "1/4", "1/2"],
      correct: 0
    },
    {
      question: "ଡେକରୁ ରାଣୀ କିମ୍ବା ରାଜା ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["2/13", "1/26", "1/13", "1/52"],
      correct: 0
    },
    {
      question: "ଦୁଇଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, 0ଥର ଚିତ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/8", "3/4", "1/4"],
      correct: 3
    },
    {
      question: "ଦୁଇଟି ପାସା ଫିଙ୍ଗିଲେ, ଯୋଗ 11 ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/12", "1/36", "1/6", "1/18"],
      correct: 3
    },
    {
      question: "ଡେକରୁ ସ୍ପେଡ୍ (♠) କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/26", "1/13", "1/4", "1/2"],
      correct: 2
    },
    {
      question: "ପାସା ଫିଙ୍ଗିଲେ ସଂଯୁକ୍ତ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/3", "1/6", "2/3"],
      correct: 0
    },
    {
      question: "ଡେକରୁ ମୁହଁ ନଥିବା କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["10/13", "3/4", "9/13", "1/2"],
      correct: 0
    },
    {
      question: "ଦୁଇଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, ଠିକ୍ 1ଥର ଚିତ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/4", "1/4", "1/2", "1/8"],
      correct: 2
    },
    {
      question: "ଡେକରୁ ସମ ସଂଖ୍ୟା (2,4,...,10) କାର୍ଡ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/3", "1/2", "5/13", "4/13"],
      correct: 2
    },
    {
      question: "ପାସାରେ ≤3 ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 1
    },
    {
      question: "ଡେକରୁ କଳା ରାଣୀ କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/26", "1/13", "1/52", "1/12"],
      correct: 0
    },
    {
      question: "4ଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, ସମସ୍ତେ ଚିତ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/8", "1/4", "1/16"],
      correct: 3
    },
    {
      question: "ଡେକରୁ ଲାଲ ରାଜା ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/26", "1/13", "2/13", "1/52"],
      correct: 0
    },
    {
      question: "ପାସାରେ 2 କିମ୍ବା 3ରେ ବିଭାଜ୍ୟ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["5/6", "2/3", "1/2", "1/3"],
      correct: 0
    },
    {
      question: "ଡେକରୁ ଏସ୍ ନ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["12/13", "3/4", "48/52", "1/2"],
      correct: 0
    },
    {
      question: "ପାସାରେ ପରିପୂର୍ଣ୍ଣ ବର୍ଗ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/6", "1/2", "2/3", "1/3"],
      correct: 0
    },
    {
      question: "ଡେକରୁ ହାର୍ଟ (♥) ନ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/4", "1/4", "1/2", "2/3"],
      correct: 0
    },
    {
      question: "ଡେକରୁ ଜାକ୍ (J) କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/26", "1/13", "1/52", "2/13"],
      correct: 1
    },
    {
      question: "ଦୁଇଟି ପାସା ଫିଙ୍ଗିଲେ, ଯୋଗ 2 ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/36", "1/12", "1/18", "1/6"],
      correct: 0
    },
    {
      question: "3ଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, ପଟ ନ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/4", "1/2", "1/8", "3/4"],
      correct: 2
    },
    {
      question: "ପାସାରେ 2ରୁ ବଡ଼ ଏବଂ 5ରୁ ଛୋଟ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 0
    },
    {
      question: "ଡେକରୁ ଡାୟମଣ୍ଡ (♦) କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/26", "1/13", "1/4", "1/2"],
      correct: 2
    },
    {
      question: "ଡେକରୁ କଳା ଏସ୍ କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/26", "1/13", "2/13", "1/52"],
      correct: 0
    },
    {
      question: "ଦୁଇଟି ପାସା ଫିଙ୍ଗିଲେ, ସେମାନଙ୍କର ଗୁଣନଫଳ ସମ ହେବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/3", "3/4", "1/4"],
      correct: 2
    },
    {
      question: "ଡେକରୁ 10ରୁ ବଡ଼ ସଂଖ୍ୟା କାର୍ଡ ଟାଣିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["3/13", "1/4", "1/2", "2/13"],
      correct: 0
    },
    {
      question: "ପାସାରେ ଅଭାଜ୍ୟ ସଂଖ୍ୟା ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["1/2", "1/3", "2/3", "1/4"],
      correct: 0
    },
    {
      question: "3ଥର ମୁଦ୍ରା ଫିଙ୍ଗିଲେ, କମରେ କମ 1ଥର ଚିତ ଆସିବାର ସମ୍ଭାବନା କେତେ?",
      options: ["7/8", "3/4", "1/4", "1/2"],
      correct: 0
    }
  ]
};

// DOM Elements
const languageSelection = document.getElementById('languageSelection');
const gameScreen = document.getElementById('gameScreen');
const gameBoard = document.getElementById('gameBoard');
const rollDiceBtn = document.getElementById('rollDice');
const animatedDice = document.getElementById('animatedDice');
const currentPositionSpan = document.getElementById('currentPosition');
const questionsAnsweredSpan = document.getElementById('questionsAnswered');
const questionModal = document.getElementById('questionModal');
const winModal = document.getElementById('winModal');
const languageToggleBtn = document.getElementById('languageToggle');
const playAgainBtn = document.getElementById('playAgain');

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    createGameBoard();
});

function setupEventListeners() {
    // Language selection
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentLanguage = this.dataset.lang;
            showGameScreen();
        });
    });

    // Roll dice button
    rollDiceBtn.addEventListener('click', rollDice);

    // Language toggle
    languageToggleBtn.addEventListener('click', function() {
        showLanguageSelection();
    });

    // Play again button
    playAgainBtn.addEventListener('click', resetGame);
}

function showLanguageSelection() {
    languageSelection.classList.add('active');
    gameScreen.classList.remove('active');
    gameActive = false;
}

function showGameScreen() {
    languageSelection.classList.remove('active');
    gameScreen.classList.add('active');
    updateLanguage();
    gameActive = true;
    resetGame();
}

function updateLanguage() {
    const lang = translations[currentLanguage];
    
    document.getElementById('gameTitle').textContent = lang.gameTitle;
    document.getElementById('diceText').textContent = lang.rollDice;
    document.getElementById('instructionsTitle').textContent = lang.instructionsTitle;
    document.getElementById('languageToggle').textContent = lang.changeLanguage;
    document.getElementById('legendTitle').textContent = lang.legendTitle;
    document.getElementById('snakeLabel').textContent = lang.snakeLabel;
    document.getElementById('ladderLabel').textContent = lang.ladderLabel;
    document.getElementById('playerLabel').textContent = lang.playerLabel;
    document.getElementById('snakePositionsTitle').textContent = lang.snakePositionsTitle;
    document.getElementById('ladderPositionsTitle').textContent = lang.ladderPositionsTitle;
    
    const instructionsList = document.getElementById('instructions');
    instructionsList.innerHTML = '';
    lang.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });

    // Update snake and ladder positions in legend
    updatePositionsGuide();
}

function updatePositionsGuide() {
    const snakePositions = document.getElementById('snakePositions');
    const ladderPositions = document.getElementById('ladderPositions');
    
    snakePositions.innerHTML = SNAKES.map(([start, end]) => 
        `${start}→${end}`).join(', ');
    
    ladderPositions.innerHTML = LADDERS.map(([start, end]) => 
        `${start}→${end}`).join(', ');
}

function createGameBoard() {
    gameBoard.innerHTML = '';
    
    // Create board cells (100 to 1, reading left-right, bottom-top in snake pattern)
    for (let row = 9; row >= 0; row--) {
        for (let col = 0; col < 10; col++) {
            const cellNumber = row % 2 === 1 
                ? (row * 10) + (10 - col)  // Odd rows: right to left
                : (row * 10) + (col + 1);  // Even rows: left to right
            
            const cell = document.createElement('div');
            cell.classList.add('board-cell');
            cell.dataset.number = cellNumber;
            cell.textContent = cellNumber;
            
            // Check if cell is snake or ladder
            const snake = SNAKES.find(([start]) => start === cellNumber);
            const ladder = LADDERS.find(([start]) => start === cellNumber);
            
            if (snake) {
                cell.classList.add('snake');
                cell.title = `Snake: Falls from ${snake[0]} to ${snake[1]}`;
            } else if (ladder) {
                cell.classList.add('ladder');
                cell.title = `Ladder: Climbs from ${ladder[0]} to ${ladder[1]}`;
            }
            
            gameBoard.appendChild(cell);
        }
    }
    
    updatePlayerPosition();
}

function updatePlayerPosition() {
    // Remove player class from all cells
    document.querySelectorAll('.board-cell').forEach(cell => {
        cell.classList.remove('player');
    });
    
    // Add player class to current position
    const currentCell = document.querySelector(`[data-number="${currentPosition}"]`);
    if (currentCell) {
        currentCell.classList.add('player');
    }
    
    // Update position display
    const lang = translations[currentLanguage];
    currentPositionSpan.textContent = `${lang.position}: ${currentPosition}`;
    questionsAnsweredSpan.textContent = `${lang.questions}: ${questionsAnswered}`;
}

function rollDice() {
    if (!gameActive || waitingForAnswer) return;
    
    rollDiceBtn.disabled = true;
    const diceValue = Math.floor(Math.random() * 6) + 1;
    
    // Start dice rolling animation
    animatedDice.classList.add('rolling');
    
    // Update dice faces during animation
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        const faces = document.querySelectorAll('.dice-face');
        faces.forEach((face, index) => {
            face.textContent = DICE_FACES[Math.floor(Math.random() * 6)];
        });
        rollCount++;
        
        if (rollCount >= 15) {
            clearInterval(rollInterval);
            
            // Stop rolling and show final value
            animatedDice.classList.remove('rolling');
            animatedDice.classList.add('shake');
            
            // Set final dice face
            const faces = document.querySelectorAll('.dice-face');
            faces.forEach(face => {
                face.textContent = DICE_FACES[diceValue - 1];
            });
            
            setTimeout(() => {
                animatedDice.classList.remove('shake');
                movePlayer(diceValue);
            }, 500);
        }
    }, 100);
}

function movePlayer(steps) {
    const newPosition = Math.min(currentPosition + steps, 100);
    currentPosition = newPosition;
    updatePlayerPosition();
    
    setTimeout(() => {
        // Check for snakes and ladders first, before showing questions
        const moved = checkSnakesAndLadders();
        
        // If no snake/ladder movement, proceed normally
        if (!moved) {
            // Check win condition
            if (currentPosition === 100) {
                showWinModal();
            } else {
                // Show question
                showQuestion();
            }
        }
    }, 500);
}

function checkSnakesAndLadders() {
    // Check for snake
    const snake = SNAKES.find(([start]) => start === currentPosition);
    if (snake) {
        setTimeout(() => {
            currentPosition = snake[1];
            updatePlayerPosition();
            rollDiceBtn.disabled = false;
        }, 1000);
        return true; // Indicate that movement occurred
    }
    
    // Check for ladder
    const ladder = LADDERS.find(([start]) => start === currentPosition);
    if (ladder) {
        setTimeout(() => {
            currentPosition = ladder[1];
            updatePlayerPosition();
            // Check win condition after ladder climb
            if (currentPosition === 100) {
                setTimeout(() => showWinModal(), 500);
            } else {
                rollDiceBtn.disabled = false;
            }
        }, 1000);
        return true; // Indicate that movement occurred
    }
    
    return false; // No movement occurred
}

function showQuestion() {
    waitingForAnswer = true;
    const questions = questionBank[currentLanguage];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    const lang = translations[currentLanguage];
    document.getElementById('questionTitle').textContent = lang.questionTitle;
    document.getElementById('questionText').textContent = randomQuestion.question;
    
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    
    randomQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-option');
        button.textContent = option;
        button.addEventListener('click', () => answerQuestion(index, randomQuestion.correct));
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('questionFeedback').innerHTML = '';
    questionModal.classList.add('active');
}

function answerQuestion(selectedIndex, correctIndex) {
    const isCorrect = selectedIndex === correctIndex;
    const options = document.querySelectorAll('.answer-option');
    const feedback = document.getElementById('questionFeedback');
    const lang = translations[currentLanguage];
    
    questionsAnswered++;
    if (isCorrect) correctAnswers++;
    
    // Disable all options
    options.forEach(option => option.disabled = true);
    
    // Show correct/incorrect styling
    options[correctIndex].classList.add('correct');
    if (!isCorrect) {
        options[selectedIndex].classList.add('incorrect');
    }
    
    // Show feedback
    if (isCorrect) {
        feedback.textContent = lang.correct;
        feedback.classList.add('correct');
    } else {
        feedback.textContent = `${lang.incorrect} ${options[correctIndex].textContent}`;
        feedback.classList.add('incorrect');
    }
    
    // Close modal after delay
    setTimeout(() => {
        questionModal.classList.remove('active');
        feedback.classList.remove('correct', 'incorrect');
        waitingForAnswer = false;
        rollDiceBtn.disabled = false;
        updatePlayerPosition();
    }, 2500);
}

function showWinModal() {
    const lang = translations[currentLanguage];
    document.getElementById('winTitle').textContent = lang.winTitle;
    document.getElementById('winMessage').textContent = lang.winMessage;
    
    document.getElementById('totalQuestionsLabel').textContent = lang.totalQuestionsLabel;
    document.getElementById('correctAnswersLabel').textContent = lang.correctAnswersLabel;
    document.getElementById('accuracyLabel').textContent = lang.accuracyLabel;
    document.getElementById('playAgain').textContent = lang.playAgain;
    
    document.getElementById('totalQuestions').textContent = questionsAnswered;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    winModal.classList.add('active');
    gameActive = false;
}

function resetGame() {
    currentPosition = 1;
    questionsAnswered = 0;
    correctAnswers = 0;
    waitingForAnswer = false;
    gameActive = true;
    
    updatePlayerPosition();
    rollDiceBtn.disabled = false;
    
    // Reset dice
    const faces = document.querySelectorAll('.dice-face');
    faces.forEach((face, index) => {
        face.textContent = DICE_FACES[index % 6];
    });
    
    // Close modals
    questionModal.classList.remove('active');
    winModal.classList.remove('active');
}

// Initialize positions guide on load
document.addEventListener('DOMContentLoaded', function() {
    updatePositionsGuide();
});