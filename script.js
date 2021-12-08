console.log("In the js")
scoreis = 0;
cross = true;

gameback = new Audio('gameback.mp3');
gameOv = new Audio('gameover.wav');
//need to add deleay at start of music to avid "play() failed because the user 
//didn't interact with the document first" error.
setTimeout(() => {         
    gameback.play();
}, 1000);

// code to jump on key press
document.onkeydown = function (e) {
    // console.log("key code is ", e.keyCode); //to know the key code
    if (e.keyCode == "38") {                  //jump is up key is pressed
        runner = document.querySelector('.runner');
        runner.classList.add("animateRunner");
        setTimeout(() => {
            runner.classList.remove("animateRunner");
        }, 700);
    }

    // move runner front 
    if(e.keyCode == 39){
        runner = document.querySelector('.runner');
        runnerx = parseInt(window.getComputedStyle(runner, null).getPropertyValue('left'));
        runner.style.left = (runnerx+ 120)+ "px";
    }

    // move tunner back
    if(e.keyCode == 37){
        runner = document.querySelector('.runner');
        runnerx = parseInt(window.getComputedStyle(runner, null).getPropertyValue('left'));
        runner.style.left = (runnerx -120)+ "px";
    }


}

//  code to detect collosion
// setinterval function to check collosion every 100 ms
setInterval(() => {
    runner = document.querySelector('.runner');
    gameOver = document.querySelector('.gameOver');
    stone = document.querySelector('.stone');

    //below function returns the value of left and top element in pixels, parseInt is used to convert value to int
    rx = parseInt(window.getComputedStyle(runner, null).getPropertyValue('left'));
    ry = parseInt(window.getComputedStyle(runner, null).getPropertyValue('top'));

    sx =  parseInt(window.getComputedStyle(stone, null).getPropertyValue('left'));
    sy =  parseInt(window.getComputedStyle(stone, null).getPropertyValue('top'));

    // offset x and y has the value of diffrence of  x and y for stone and runner 
     offsetX = Math.abs(rx-sx);
     offsetY = Math.abs(ry-sy);
    
    //  game over based on diffrence value of x and y
    if(offsetX< 66 && offsetY< 50){
        gameOver.innerHTML = "Game Over"; //display game over message
        gameOver.style.color = "red"; 
        gameOver.style.fontSize = "50px"; 
        gameOver.style.top = "45%"; 
        stone.classList.remove('animateStone');         // stop stone animation
        gameback.pause();
        gameOv.play();
        setTimeout(() => {
            gameOv.pause();
        }, 800);
    }
    else if(offsetX < 66 && cross){
        scoreis += 1;                               //increase score by one
        updateScore(scoreis);
        cross = false;                              //set cross to false so score should not keep updating when stone and runner are near
        setTimeout(() => {                          //set cross true so score could update for next jump
            cross = true;
        }, 1000);

        // function to increase stone animation speed each time runner crosser stone 
       
        aniDur = parseFloat(window.getComputedStyle(stone, null).getPropertyValue('animation-duration'));   //getting current value of animation duration
        newDur = aniDur - 0.1; // computing new animation duration value to increase speed
        console.log(newDur);
        if(newDur>2){
        stone.style.animationDuration = newDur + 's';
        }
        
    }    
}, 10);

function updateScore(scoreis) {             //function to update score
    document.querySelector('.score').innerHTML = "Score : "+ scoreis;
    console.log(scoreis);
}
