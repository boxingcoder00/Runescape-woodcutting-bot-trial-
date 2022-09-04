// import the robotjs library
var robot = require('robotjs');

function main() {
    console.log("starting...");
    sleep(4000);

    //basic infinite loop. use ctrl+c in a terminal to stop program
    while (true) {
        var tree = findTree();
        // if we cant find a tree,write an error message and exit the loop
        if (tree == false) {
            rotateCamera();
            continue;
        }

        // chop down first tree
        robot.moveMouse(tree.x, tree.y); //screenshot and use MSpaint to find out coordinates of spot
        robot.mouseClick();
        sleep(8000);

        //drop logs from the inventory
        dropLogs();
    }

}

function dropLogs() {
    var inventory_x = 1882;
    var inventory_y = 830;
    var inventory_log_color = "765b37";

    var pixel_color = robot.getPixelColor(inventory_x, inventory_y);
    //console.log("inventory log color is " + pixel_color);

    var wait_cycles = 0;
    var max_wait_cycles = 9;
    while (pixel_color != inventory_log_color) {
        // waiting a little bit longer to see if the chopping finish
        sleep(1000);
        //sample the pixel color again after waiting
        pixel_color = robot.getPixelColor(inventory_x, inventory_y);
        // increment our counter
        wait_cycles++;
    }

     //drop logs from the inventory if the color matches the expected log color
     if (pixel_color == inventory_log_color && wait_cycles < max_wait_cycles) {
     robot.moveMouse(inventory_x, inventory_y);
     robot.mouseClick('right');
     sleep(300);
     robot.moveMouse(inventory_x, inventory_y + 70);
     robot.mouseClick();
     sleep(1000);
     }
}

function testScreenCapture() {
    //taking a screenshot
    var img = robot.screen.capture(0, 0, 1920, 1080);

    var pixel_color = img.colorAt(30, 18);
    console.log(pizel_color);
}

function findTree() {
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(0, y, width, height);

    //use paint to find colors and google hex color
    var tree_colors = ["5b462a", "60492c", "6a5130", "705634", "6d5432", "574328"];

    for (var i = 0; i < 100; i++) { {
        var random_x = getRandomInt(0, width -1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            if (confirmTree(screen_x, screen_y)) {
                console.log("found a tree at: " + screen_x + ", " + screen_y + " color " + sample_color);
            return{x: screen_x, y: screen_y};
            } else {
                console.log("unconfirmed tree at: " + screen_x + ", " + screen_y + " color " + sample_color);
            }
        }
    }


// did not find the color in our screenshot
return false;
 }

 function rotateCamera() {
    console.log("Rotating camera");
    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
 }

 function confirmTree(screen_y, screen_x) {
    //first move the mouse to the given coordinates
    robot.moveMouse(screen_x, screen_y);
    // wait a moment for the help text to appear
    sleep(300);

    //now check the color of the action text
    var check_x = 103;
    var check_y = 63;
    var pixel_color = robot.getPixelColor(check_x, check_y);

    return pixel_color = "00fff";
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


main();