
/**
 * Initializes the game by hiding the title and start screen, displaying the main game interface,
 * and setting up initial game elements. This includes showing the inventory button, adding initial items
 * to the inventory, changing the background to the story scene, and starting the first scene's narration
 * with a typing effect.
 */
function startGame() {

    document.getElementById("title").style.display = "none";
    document.getElementById("startScreen").style.display = "none";

    /* Show the game interface */
    document.getElementById("sceneContainer").style.display = "flex";
    changeBackground('story');

    const storyText = `A young man wakes up in a dark cave, alone and disoriented. 
        The only thing he remembers is a mysterious map hidden in his pocket, 
        showing the way to a legendary treasure, the lost ark.
    `;

    typeText(storyText, () => {
        setTimeout(() => eventTextAndButtons('explore'), 500);
    });
}

/**
 * Shows a given scene in the game, by clearing any previous narration and events, setting the background
 * to the scene's associated background image, and displaying the scene's text and buttons. The scene is
 * determined by the "scene" argument passed in.
 *
 * @param {string} scene - The scene to show. This can be any of the scene names defined in the game.
 */
function showScene(scene) {
    const narration = document.getElementById("narration");
    const events = document.getElementById("events");
    const options = document.getElementById("options");

    narration.innerHTML = "";
    events.innerHTML = "";
    options.innerHTML = "";

    changeBackground(scene);

    let sceneText = "";

    switch (scene) {
        case "narration1":
            sceneText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;
            typeText(sceneText, () => {
                setTimeout(() => eventTextAndButtons('explore'), 500);
            });
            break;


        case "explore":
            sceneText = `Following the whisper, he discovers an old sage who gives him a clue to the treasure. 
            The Old Sage: "The wilderness is unforgiving. Learn to read the signs, and you'll find your way.`;
            typeText(sceneText, () => {
                options.innerHTML += `
                    <div class="button-container">
                        <button onclick="listenToTheOldMan()" class="fade-in">Ask For Advice</button>
                        <button onclick="showScene('narrationAfterExplore')" class="fade-in">Venture</button>
                    </div>
                    <img id="torchImage" src="media/torch.png" class="fade-in" onclick="pickUpItem('torch')" alt="torch" style="width: 50px; cursor: pointer;"/>
                `;
                setTimeout(fadeInContent, 100);

            });
            break;

        case "narrationAfterExplore":
            sceneText = `A chill crept down his spine as the old man's words echoed. 
                        Curiosity and dread warred within him. Drawn by the promise of treasure, he ventured deeper into the ominous darkness.`;
            typeText(sceneText, () => {
                setTimeout(() => eventTextAndButtons('crossroads'), 500);
            });

            break;

        case "narrowPassage":
            if (getInventory().includes("torch")) {
                sceneText = `You crawl into the narrow passage, breathing slowly to keep yourself calm. 
                The walls are cold and sticky, and every movement feels difficult and claustrophobic. 
                Suddenly you feel something touch your arm – a cluster of small, poisonous spiders. You flinch, but manage to stay calm enough to press on. 
                When you finally reach the exit, you see an ancient stone with a clear carving - the final clue to the treasure!
                `;
                typeText(sceneText, () => {
                    narration.innerHTML += `
                        <div class="button-container">
                            <button onclick="showScene('treasureEnding')" class="fade-in">Discover The Treasure!</button>
                        </div>
                    `;
                    setTimeout(fadeInContent, 100);

                });
            } else {
                sceneText = `Without a torch, the narrow passage is too dark to navigate.
                You stumble, and the ground gives way beneath you.`;
                setTimeout(() => showEndScreen("You Died", "You couldn't make it through the narrow passage without a torch.", "sadEnding"), 10);
            }
            break;

        case "rockyRoad":
            if (getInventory().includes("rope")) {

                sceneText = `You choose the wider, rocky road, convinced that it is safer. 
                The road slopes downwards and becomes increasingly uneven. Suddenly you hear a rumbling sound – pebbles and rocks start falling around you.
                You rush forward, but a large rock comes loose and blocks your way back. 
                The ground shakes, and before you can react, you slip on the slippery rock. 
                You grope for grip, but fall hard, the world disappearing in a moment of chaos and darkness.
                `;
                typeText(sceneText, () => {
                    narration.innerHTML += `
                        <div class="button-container">
                            <button onclick="showScene('treasureEnding')" class="fade-in">Continue your journey</button>
                        </div>
                    `;
                    setTimeout(fadeInContent, 100);

                });
            } else {
                sceneText = `The rocky road proves too treacherous without a rope to help you climb. You slip and fall to your death.`;
                setTimeout(() => showEndScreen("You Died", "Without the rope, you couldn't make it across the rocky road.", "sadEnding"), 10);

            }
            break;

        case "ignore":
            sceneText = `While the faint whisper still echoes in the air, the character feels a chilly wind sweep through the cave. 
            Something makes you hesitate the feeling of following the whisper feels dangerous, and maybe even unnecessary.
            He decides to ignore the sound and continue forward and finds a mysterious message on a wall.
            `;

            typeText(sceneText, () => {
                narration.innerHTML += `
                    <div class="button-container">
                        <button onclick="readInscription()" class="fade-in">Read The Scripture</button>
                        <button onclick="showScene('nextSceneInIgnorePath')" class="fade-in">Continue</button>
                    </div>
                `;
                setTimeout(fadeInContent, 100);
            });
            break;

        case "nextSceneInIgnorePath":
            sceneText = `The player, unable to decipher the cryptic message, continues his journey. 
            The air grows colder, the shadows longer. As the path twists and turns, uncertainty creeps in. 
            `;

            typeText(sceneText, () => {
                narration.innerHTML += `
                    <div class="button-container">
                        <button onclick="showScene('criticalMoment')" class="fade-in">Keep Moving Forward</button>
                    </div>
                `;
                setTimeout(fadeInContent, 100);
            });
            break;

        case "criticalMoment":
            sceneText = `As the player ventures deeper, a chilling presence fills the air. 
            The darkness feels alive, as if something unseen trails behind. 
            They reach a spot where the walls are clawed with strange marks and unsettling 
            tracks—signs of recent visitors...or perhaps something far more menacing.
            `;

            typeText(sceneText, () => {
                setTimeout(() => eventTextAndButtons('now_or_never'), 500);
            });
            break;

        case "escapeEnding":
            showEndScreen(
                "Survived!",
                "You have succesfully escaped the cave!",
                "escapeEnding"
            );

            break;

        case "treasureEnding":
            showEndScreen(
                "Congratulations!",
                "You just found the legendary treasure!",
                "treasureEnding"
            );
            break;

        case "sadEnding":
            showEndScreen(
                "You Died!",
                "The rocky road turned out to be more treacherous than you could have ever imagined. The cave remains a mystery, and the treasure undiscovered.",
                "sadEnding"
            );
            break;


    }
}



/**
 * Displays event text and buttons for a given scene, and applies a fade-in effect.
 * Clears any previous event text and options, then sets up new content based on
 * the provided scene. The buttons trigger specific actions or scene changes
 * when clicked.
 *
 * @param {string} scene - The current scene identifier, determining the text and
 *                         options to be displayed. Possible values include 'explore',
 *                         'crossroads', 'now_or_never', etc.
 */
function eventTextAndButtons(scene) {
    const events = document.getElementById("events");
    const options = document.getElementById("options");

    events.innerHTML = "";
    options.innerHTML = "";

    let eventText = "";

    events.innerHTML = `
            <p class="eventTextStyle fade-in">...A strange whisper is heard...</p>`;

    switch (scene) {
        case 'explore':

            eventText = "...A strange whisper is heard...";
            options.innerHTML = `
                <button onclick="playClickSound(); selectPath('explore')" class="fade-in">EXPLORE</button>
                <button onclick="playClickSound(); selectPath('ignore')" class="fade-in">IGNORE</button>   
            `;
            break;

        case 'crossroads':
            eventText = "...Squeeze through or crush your toes? That is the question....";
            options.innerHTML = `
                <button onclick="playClickSound(); selectPath('narrowPassage')" class="fade-in">The Narrow Passage</button>
                <button onclick="playClickSound(); selectPath('rockyRoad')" class="fade-in">The Rocky Road</button>
            `;
            break;

        case "now_or_never":
            eventText = 'The red eyes glowed in the darkness, freezing the young man in horror. His heart pounded so fiercely, it felt ready to burst."';
            options.innerHTML = `
                <button onclick="showScene('escapeEnding')" class="fade-in">Leave The Cave</button>
            `;
            break;

        default:
            eventText = "";
    }

    events.innerHTML = `<p class="eventTextStyle fade-in">${eventText}</p>`;

    fadeInContent();
}


/**
 * Adds the "show" class to all elements with class "fade-in" after a short delay, in order of their appearance in the DOM.
 * This creates a fade-in effect for the buttons.
 */
function fadeInContent() {
    const buttons = document.querySelectorAll('.fade-in');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add("show");
        }, 200 * (index + 1)); /* a short delay for each button */
    });
}


/**
 * Asks the user for confirmation before choosing a path.
 * If the user confirms, it changes the scene based on the choice.
 * If the user cancels, it shows a message saying "Action canceled".
 * 
 * @param {string} choice - The choice to be confirmed. Can be "explore", "ignore", "narrowPassage", or "rockyRoad".
 */
function selectPath(choice) {
    let confirmation;

    if (choice === "explore") {
        confirmation = confirm("Are you sure you want to explore the whisper?");
    } else if (choice === "ignore") {
        confirmation = confirm("Are you sure you want to ignore the whisper?");
    } else if (choice === "narrowPassage") {
        confirmation = confirm("You need a torch to make it through the narrow passage!");
    } else if (choice === "rockyRoad") {
        confirmation = confirm("You need a rope to make it through The Rocky Road");
    }

    if (confirmation) {
        showPopupMessage("Path chosen");

        /* Manage the choice and change the scene based on it */
        switch (choice) {
            case "explore":
                showScene("explore");
                break;
            case "ignore":
                showScene("ignore");
                break;
            case "narrowPassage":
                showScene("narrowPassage");
                break;
            case "rockyRoad":
                showScene("rockyRoad");
                break;
        }

    } else {
        showPopupMessage("Action canceled");

    }
}

/**
 * Changes the background image of the body based on the scene argument.
 * The scene argument determines which background image is set.
 * The function also adds a smooth transition effect on background change.
 * 
 * @param {string} scene - The scene to set the background image for.
 *                          Can be "story", "explore", "ignore", "narrationAfterExplore", "nextSceneInIgnorePath", "criticalMoment", "narrowPassage", "rockyRoad", "escapeEnding", "treasureEnding", "sadEnding", or "startScreen".
 */
function changeBackground(scene) {
    const body = document.body;

    /* Define the background images for each scene */

    switch (scene) {
        case "story":
            body.style.backgroundImage = "url('media/youngMan.webp')";
            break;
        case "explore":
            body.style.backgroundImage = "url('media/oldSage.png')";
            break;
        case "ignore":
            body.style.backgroundImage = "url('media/examine.webp')";
            break;
        case "narrationAfterExplore":
            body.style.backgroundImage = "url('media/into_depper.webp')";
            break;
        case "nextSceneInIgnorePath":
            body.style.backgroundImage = "url('media/nextScene.webp')";
            break;
        case "criticalMoment":
            body.style.backgroundImage = "url('media/leave_cave.webp')";
            break;
        case "narrowPassage":
            body.style.backgroundImage = "url('media/narrowPassage.webp')";
            break;
        case "rockyRoad":
            body.style.backgroundImage = "url('media/rockyRoad.webp')";
            break;

        case "escapeEnding":
            body.style.backgroundImage = "url('media/escapeScene.webp')";
            break;
        case "treasureEnding":
            body.style.backgroundImage = "url('media/treasure.webp')";
            break;
        case "sadEnding":
            body.style.backgroundImage = "url('media/sadEnding.png')";
            break;
        case "startScreen":
            body.style.backgroundImage = "url('media/black.jpeg')";
            break;

        default:
            body.style.backgroundImage = "";
            break;
    }

    body.style.transition = "background-image 1s ease-in-out";

}

/**
 * Types out a given string of text on the page, with a typing animation effect.
 * The text is displayed in the element with the id "narration".
 * The callback function is called when the text is finished being typed out.
 * @param {string} text - The text to be typed out.
 * @param {function} callback - The function to call when the text is finished.
 */
function typeText(text, callback) {
    const narrationText = document.getElementById("narration");
    narrationText.textContent = "";
    narrationText.style.display = "block"; /* Show the story text */

    let letterIndex = 0;
    const typingSpeed = 10;

    const typingSound = new Audio("media/typingSound.mp3");
    typingSound.loop = true;

    typingSound.play();

    function type() {
        if (letterIndex < text.length) {
            narrationText.textContent += text[letterIndex];
            letterIndex++;
            setTimeout(type, typingSpeed);
        } else {

            typingSound.pause();
            typingSound.currentTime = 0;

            /* when the text is finished, calling the callback function to manipulate the DOM */
            if (callback) {
                callback();
            }
        }
    }

    type();

}

/**
 * Shows a popup message with the given message. The popup is animated to appear and disappear
 * after 3 seconds. If the message is empty, the popup is not shown.
 * 
 * @param {string} message - The message to be displayed in the popup.
 */
function showPopupMessage(message) {
    const popup = document.getElementById("popupMessage");
    popup.innerText = message;
    popup.style.display = "block";

    /* Popup-animation */
    setTimeout(() => {
        popup.style.opacity = "1";
        popup.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);

    /* Hide the popup after 3 seconds */
    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transform = "translate(-50%, -50%) scale(0.9)";
        setTimeout(() => {
            popup.style.display = "none";
        }, 500);
    }, 3000);
}


const audio = new Audio('media/wiseManSaid.mp3');
let isPlaying = false;

/**
 * Toggles the playback of the audio clip with the wise man's voice. If the audio is
 * currently playing, it is paused. If it is currently paused, it is played.
 */
function listenToTheOldMan() {
    isPlaying ? audio.pause() : audio.play();

    audio.onplaying = function () {
        isPlaying = true;
    }

    audio.onpause = function () {
        isPlaying = false;
    }
}

const clickSound = new Audio('media/buttonClickSound.mp3');

/**
 * Plays the click sound effect when a button is pressed.
 */
function playClickSound() {
    clickSound.play();
}

/**
 * Reads the inscription on the stone and displays its content to the player.
 * The inscription hints at the location of the key to the treasure.
 */
function readInscription() {
    const narration = document.getElementById("narration");
    const options = document.getElementById("options");

    narration.innerHTML = `
        <p>[As dark shadows move on the stone's surface, and echoes of lost voices fill the air, look for the stone that doesn't belong. There, deep in the heart of the cave, you will find the key to what is hidden]</p>
    `;

    options.innerHTML = `
        <button onclick="showScene('ignore')">Back</button>
    `;
}



/**
 * Hides the main game interface and shows the ending screen with the given title and message.
 * The background of the ending screen is changed to the given scene.
 * @param {string} title - The title to be displayed on the ending screen.
 * @param {string} message - The message to be displayed on the ending screen.
 * @param {string} scene - The scene to be used as the background of the ending screen.
 */
function showEndScreen(title, message, scene) {

    document.getElementById("endTitle").innerText = title;
    document.getElementById("endMessage").innerText = message;

    const endScreen = document.getElementById("endScreen");

    document.getElementById("sceneContainer").style.display = "none";
    endScreen.style.display = "flex";

    changeBackground(scene);

}

/**
 * Resets the game state by clearing local storage, hiding the ending screen and showing the title and start screen again.
 * The background of the start screen is also changed to the "startScreen" scene.
 */
function restartGame() {
    localStorage.clear();

    document.getElementById("endScreen").style.display = "none";

    document.getElementById("title").style.display = "block";
    document.getElementById("startScreen").style.display = "block";

    changeBackground("startScreen");

}

/**
 * Adds the given items to the player's inventory and saves it to local storage.
 * If an item is already in the inventory, it is not added again.
 * After adding the items, a popup message is shown for each item added.
 * 
 * @param {...string} items - The items to be added to the player's inventory.
 */
function addToInventory(...items) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    items.forEach(item => {
        if (!inventory.includes(item)) {
            inventory.push(item);
        }
    });

    localStorage.setItem('inventory', JSON.stringify(inventory));
    items.forEach(item => {
        showPopupMessage(`${item} added to inventory!`);
    });
}

/**
 * Returns the current inventory of the player as an array of strings.
 * If there is no inventory saved in local storage, an empty array is returned.
 * @returns {string[]} The current inventory of the player.
 */
function getInventory() {
    return JSON.parse(localStorage.getItem('inventory')) || [];
}

/**
 * Removes the specified item from the player's inventory and updates the inventory in local storage.
 * If the item is not present in the inventory, no changes are made.
 * 
 * @param {string} item - The item to be removed from the inventory.
 */
function removeFromInventory(item) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory = inventory.filter(i => i !== item);
    localStorage.setItem('inventory', JSON.stringify(inventory));
}


/**
 * Picks up the specified item from the scene and adds it to the player's inventory.
 * The item is removed from the scene after being picked up.
 * 
 * @param {string} item - The item to be picked up.
 */
function pickUpItem(item) {
    addToInventory("torch");
    document.getElementById("torchImage").style.display = "none";
}

