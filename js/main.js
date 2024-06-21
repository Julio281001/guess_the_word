"use strict";

const inputsContainer = document.querySelector("#inputsContainer");
const wordParagrahp = document.querySelector("#scrambledWord");

// const addRequiredInputs = function (word) {
//     for (let i = 0; i < word.length; i++) {
//         const input = document.createElement("input");
//         input.type = "text";
//         input.maxLength = 1;
//         input.style.padding = "5px";
//         input.style.margin = "5px";
//         input.style.textAlign = "center";
//         input.style.width = "30px";
//         input.style.fontSize = "14px";
//         inputsContainer.appendChild(input);
//         if (i == 0) {
//             input.focus();
//         }
//         else {
//             input.disabled = true;
//         }
//         input.addEventListener("input", function () {
//             if (this.value) {
//                 if (word.includes(this.value)) {
//                     if (input.nextElementSibling) {
//                         input.nextElementSibling.disabled = false;
//                         input.nextElementSibling.focus();
//                     }
//                     input.disabled = true;
//                 } else {
//                     this.value = "";
//                 }
//             }
//         });
//     }
// }

// const displayWord = function (word) {
//     wordParagrahp.textContent = word.split('').sort(() => Math.random() - 0.5).join('');;
// }

// const getWord = function () {
//     fetch("https://random-word-form.herokuapp.com/random/noun/")
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             displayWord(data[0]);
//             addRequiredInputs(data[0]);
//         });
// }

const addInputs = function (word) {
    const remainingLetters = word.split('');
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
                    const index = remainingLetters.indexOf(this.value);
                    remainingLetters.splice(index, 1);
                    if (input.nextElementSibling) {
                        input.nextElementSibling.disabled = false;
                        input.nextElementSibling.focus();
                    }
                    input.disabled = true;
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
}();