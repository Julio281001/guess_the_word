"use strict";

const inputsContainer = document.querySelector("#inputsContainer");
const wordParagrahp = document.querySelector("#scrambledWord");

const addInputs = function (word) {
    const remainingLetters = word.split('');
    let userGuess = "";
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.style.padding = "5px";
        input.style.margin = "5px";
        input.style.textAlign = "center";
        input.style.width = "30px";
        input.style.fontSize = "14px";
        inputsContainer.appendChild(input);
        if (i == 0) {
            input.focus();
        }
        else {
            input.disabled = true;
        }
        input.addEventListener("input", function () {
            if (this.value) {
                if (remainingLetters.includes(this.value)) {
                    userGuess += this.value;
                    const index = remainingLetters.indexOf(this.value);
                    remainingLetters.splice(index, 1);
                    input.disabled = true;
                    if (input.nextElementSibling) {
                        input.nextElementSibling.disabled = false;
                        input.nextElementSibling.focus();
                    } else {
                        if (userGuess === word) {
                            alert("You win!");
                        } else {
                            alert("You lose!");
                        }
                    }
                } else {
                    this.value = "";
                }
            }
        });
    }
}

const displayWord = function (word) {
    wordParagrahp.textContent = word.split('').sort(() => Math.random() - 0.5).join('');;
}

const getWord = async function () {
    try {
        const response = await fetch("https://random-word-form.herokuapp.com/random/noun/");
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const main = async function () {
    const [word] = await getWord();
    console.log(word);
    displayWord(word);
    addInputs(word);
};

main();