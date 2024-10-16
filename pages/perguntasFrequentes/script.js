function showAnswer(answerId) {
    setTimeout(() => {
        let selectedAnswer = document.getElementById(answerId);
        if (selectedAnswer.style.display === "flex") {
            selectedAnswer.style.animation = "fadeOut 0.5s forwards";
            setTimeout(() => {
                selectedAnswer.style.display = "none";
            }, 100);
        } else {
            selectedAnswer.style.display = "flex";
            selectedAnswer.style.animation = "fadeIn 0.5s forwards";
        }
    }, 100);
}
