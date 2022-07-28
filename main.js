window.onload = function() {

    // Array for the alphabet, contains chars of each letter in the english alphabet
    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 

    let categories ; // List of categories
    let chosenCategory ;  // The chosen category
    let getHint;
    let word ; // Selected word
    let guess ; // Guess
    let guesses = [ ]; // Array of stored guesses
    let lives ; // The remaining life variable
    let counter ; // The counter for correct guesses
    let space ; // Number of spaces in the word "-"

    // Get HTML elements

    const showLives = document.getElementById("remaining-lives"); //Stores the html element as the value of the variable
    const showCategory = document.getElementById("categoryName");
    const getaHint = document.getElementById("hint");
    const showClue = document.getElementById("clue");

    // Create alphabet ul

    const alphabetbuttons = function() { 
        myButtons = document.getElementById("buttons"); // imports the buttons used for interactions
        letters = document.createElement('ul'); // creates an ul and stores it in the variable

        for (let i = 0; i < alphabet.length; i++) {  // basic For loop that runs until it hits the end of the alphabet array []
            letters.id = 'alphabet';
            list = document.createElement("li");
            list.setAttribute('class', 'letters');
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }

    // Select Category

    const selectCategory = function() {
        if (chosenCategory === categories[0]) {
            categoryName.innerHTML = "The Chosen Category Is Gaming";
        } else if (chosenCategory === categories[1]) {
          categoryName.innerHTML = "The Chosen Category Is Anime";
        } else if (chosenCategory === categories[2]) {
            categoryName.innerHTML = "The Chosen Category Is Art";
        }
    }

    // Create Guesses ul 
    const result = function() {
        wordHolder = document.getElementById("hold");
        correct = document.createElement("ul");

        for (let i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li')
            guess.setAttribute('class', 'guess');

            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
            guess.innerHTML = "_";
            }
        

        guesses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
    }
}

    // Show remaining lives

    let comments = function() {
        showLives.innerHTML = "you have " + lives + " lives";

        if (lives < 1) {
            showLives.innerHTML = "Game Over!"
        }
        for (let i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                showLives.innerHTML = "You Win!";
            }
        }
    }

    // Animate Hangman

    let animation = function() {
        let drawMe = lives;
        drawArray[drawMe]();
    }

    // Hangman

         
    /* canvasDraw = function() {

        myHangMan = document.getElementById("hangman");
        context = myHangMan.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    } */

    canvasDraw = function() {
        myHangMan = document.getElementById("hangman");
        context = myHangMan.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#ff";
        context.lineWidth = 2;
    }

    head = function() {
        myHangMan = document.getElementById('hangman');
        context = myHangMan.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true)
        context.stroke();

    }
    // main drawing function

    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function() {
        draw(0, 150, 150, 150);
    }

    frame2 = function() {
        draw(10, 0, 10, 600);
    }

    frame3 = function() {
        draw(0, 5, 70, 5);
    }

    frame4 = function() {
        draw(60, 5, 60, 15);
    }

    torso = function() {
        draw(60, 36, 60, 70);
    }

    rightArm = function() {
        draw(60, 46, 100, 50);
    }

    leftArm = function() {
        draw(60, 46, 20, 50);
    }

    rightLeg = function() {
        draw(60, 70, 100, 100);
    }

    leftLeg = function() {
        draw(60, 70, 20, 100);
    }

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    // OnClick Function

    check = function () {

        list.onclick = function () {
          let guess = (this.innerHTML);
          this.setAttribute("class", "active");
          this.onclick = null;

          for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
              guesses[i].innerHTML = guess;
              counter += 1;
            } 
          }
          var j = (word.indexOf(guess));
          if (j === -1) {
            lives -= 1;
            comments();
            animation();
          } else {
            comments();
          }
        }
      }

      // play 

      const play = function() {

        categories = [
        ["pokemon", "world of warcraft", "among us", "dungeons and dragons", "steam"],
        ["monogatari", "demon slayer", "naruto", "dragon ball", "one piece", "school days", "ghost stories"],
        ["Leonardo", "Picasso", "Vincent van gogh", "Salvador Dali", "Rembrandt", "Henri Matisse", "Andy Warhol"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        console.log(chosenCategory)
        alphabetbuttons();

        guesses = [ ];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCategory();
        canvasDraw();
      }

      play();

      // Hint

      hint.onclick = function() {
        hints = 
        [
        ["the game was inspired from bug catching", "a big MMORPG game", "a game that became a social hit during the start of covid pandemic in 2020", "people usually refer to this for RPG rulesets", "popular game store online"],
        ["an anime about vampires, supernatural creatures and weird toothbrush scenes", "Kid fights demons with kindness", "village reject's adventure to become a master", "anime inspired by journey to the west and more", "the journey is worth more than the goal", "infamous anime with lots of cheating", "Anime dub gone horribly wrong"],
        ["famous artist for delivering a smile", "Abstract artist", "sent his right ear to his lover", "The Persistence of Memory", "Dutch artist known for being one of the greatest visual artists", "Fluid and colourful painter", "leading figure in pop art"]
        ];

        let categoryIndex = categories.indexOf(chosenCategory);
        let hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints [categoryIndex][hintIndex];
      };

      // Reset

        document.getElementById("reset").onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
      }

      
}
