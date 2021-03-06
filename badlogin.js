/*
 * This object handles the bad logins drawings.  It's basically a utility object
 * which knows how to draw the dots and handle the interactions with the graph.
 */
badLogins = {
    /**
     * This function handles drawing the lines which separate
     * the swimlanes of the chart.
     *
     * @param x the x coordinate of the line
     * @param y the y coordinate of the line
     * @param length the length of the line
     */
    drawLine: function(x, y, length) {
        var path1 = "M " + x + " " + y + " L " + length + " " + y;
        badLogins.r.path(path1).attr({"stroke-width": 1, "stroke": "black"});
    },
    
    /**
     * Show the popup for a specific dot when the user hovers the 
     * mouse over it.
     *
     * @param x the x coordinate to show the popup at
     * @param y the y coordinate to show the popup at
     * @param text the text of the popup
     */
    showPopup: function(x, y, text) {
         x += 5;
         y += 5;
         
         $('#popup').html(text);
         
         $('#popup').css( {
             left: x + 'px',
             top: y + 'px'
             
         }).show('fast');
    },
    
    /**
     * Hide the popup when the user moves their mouse somewhere else
     */
    hidePopup: function() {
         $('#popup').hide('slow');
    },
    
    /**
     * This function adds a circle to the graph and handles the interactions 
     * with that circle.
     *
     * @param x the x coordinate of the dot
     * @param y the y coordinate of the dot
     * @param radius the radius of the dot
     * @param color the color of the dot
     */
    circle: function(x, y, radius, color) {
         var inCircle = true;
         return badLogins.r.circle(x, y, radius).attr({fill: color, "stroke-width": 0})
            .mouseover(function (event) {
                inCircle = true;
                this.animate({r: 8}, 100);
                var boxX = this.getBBox().x - 50;
                var boxY = this.getBBox().y;
                
                /*
                 * We want to show the popup for the dot when the user hovers
                 * their mouse over the dot and waits for a quarter of a second.
                 */
                setTimeout(function() {
                    if (inCircle) {
                        /*
                         * Here we have a little hacking to make the title show up properly
                         * in the popup.
                         */
                        var title = '';
                        if (y < 150) {
                            title = 'HR Database';
                        } else if (y < 250) {
                            title = 'SAP Payroll System';
                        } else if (y < 250) {
                            title = 'Identity System';
                        } else if (y < 450) {
                            title = 'Payroll Processing';
                        } else if (y < 550) {
                            title = 'PeopleSoft';
                        }
                        var paperWidth = $('div.container').width();
                        
                        if (boxX + 210 > paperWidth - 25) {
                            /*
                             * We want to pull the popup back a little bit if it's too
                             * far to the right and ends up outside of the graph.
                             */
                            boxX = paperWidth - 235;
                        }
                        
                        /*
                         * We want to show a different message for the gray dots which are 
                         * successful logins and the colored dots which represents failed 
                         * logins.
                         */
                        if (color === 'darkgray') {
                            badLogins.showPopup(boxX, boxY, '<h4>' + title + '</h4>' + 
                                'admin logged into ' + title + ' from 24.61.131.44 on 11:15 AM, February 1');
                        } else {
                            badLogins.showPopup(boxX, boxY, '<h4>' + title + '</h4>' + 
                                'Someone from 24.61.131.44 tried to log in as admin on 11:15 AM, February 1');
                        }
                    }
                }, 250);
            }).mouseout(function (event) {
                /*
                 * When the mouse goes out of the dot we want to close the popup
                 */
                if (inCircle) {
                    badLogins.hidePopup();
                }
                inCircle = false;
                this.animate({r: 3}, 200);
            });    
    }    
}

jQuery(document).ready(function(){
    
    badLogins.r = Raphael("holder", '100%', '100%');
    
    var width = $('#holder').width() - 50;
    
    for (var y = 50; y < 600; y += 100) {
        badLogins.drawLine(100, y, width);
    }
    
    /*
     * We'll start with all of our successfull logins
     */
    for (var i = 0; i < 20; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 140, 3, "darkgray");
    }
    
    for (var i = 0; i < 10; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 240, 3, "darkgray");
    }
    
    for (var i = 0; i < 23; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 340, 3, "darkgray");
    }
    
    for (var i = 0; i < 6; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 440, 3, "darkgray");
    }
    
    for (var i = 0; i < 14; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 540, 3, "darkgray");
    }
    
    /*
     * Now a user with a bad password in Windows
     */
    for (var i = 0; i < 200; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 60, 3, "#fec01e");
    }
    
    for (var i = 0; i < 200; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 160, 3, "#fec01e");
    }
    
    for (var i = 0; i < 200; i++) {
        badLogins.circle(Math.max(125, Math.floor(Math.random() * width)), 460, 3, "#fec01e");
    }
    
    /*
     * Now the pink dots
     */
    var x = 150;
    var y = 140;
    for (var i = 0; i < 5; i++) {
        x += Math.floor(Math.random() * 40);
        y -= 5;
        
        if (i == 4) {
            badLogins.circle(x, y, 3, "darkgray");
        } else {
            badLogins.circle(x, y, 3, "#f69c9f");         // pink
        }
    }
    
    /*
     * Now the yellow dots
     */
    x = Math.floor(width / 3);
    for (var i = 0; i < 3; i++) {
        x += Math.floor(Math.random() * 15);
        badLogins.circle(x, 140, 3, "#00aeef");         // yellow
    }
    
    x += Math.floor(width / 10);
    badLogins.circle(x, 130, 3, "#00aeef");             // yellow
    
    
    /*
     * Now the green dots
     */
    x = width - (Math.floor(width / 10) * 4);
    y = 140;
    for (var i = 0; i < 10; i++) {
        x += Math.floor(Math.random() * 45);
        y -= 5;
        
        if (i == 9) {
            badLogins.circle(x, y, 3, "darkgray");
        } else {
            badLogins.circle(x, y, 3, "#52b755");           // green
        }
    }
    
    /*
     * Now the yellow dots
     */
    x = width - (Math.floor(width / 10) * 7);
    y = 240;
    for (var i = 0; i < 5; i++) {
        x += Math.max(10, Math.floor(Math.random() * 20));
        y -= 5;
        
        badLogins.circle(x, y, 3, "#e0cb61");           // beige
    }
    
    x += Math.max(60, Math.floor(Math.random() * 80));
    badLogins.circle(x, y - 5, 3, "darkgray");           // beige
    
    /*
     * Now the blue dots
     */
    x = width - (Math.floor(width / 10) * 6);
    y = 240;
    for (var i = 0; i < 5; i++) {
        x += Math.max(60, Math.floor(Math.random() * 80));
        y -= 5;
        
        if (i == 4) {
            badLogins.circle(x, y, 3, "darkgray");
        } else {
            badLogins.circle(x, y, 3, "#157d6b");           // blue
        }
    }
    
    /*
     * Now the red dots.  We'll start with the first curve
     */
    x = width - (Math.floor(width / 10) * 8.5);
    var y = 340;
    for (var i = 0; i < 25; i++) {
        x += Math.floor(Math.random() * 30);
        y -= 3;
        
        badLogins.circle(x, y, 3, "#ee2a33");           // red
    }
    
    /*
     * Now the second curve
     */
    x = width - (Math.floor(width / 10) * 5.5);
    var y = 340;
    for (var i = 0; i < 22; i++) {
        x += Math.floor(Math.random() * 30);
        y -= 3;
        
        if (i == 21) {
            badLogins.circle(x, y, 3, "darkgray");
        } else {
            badLogins.circle(x, y, 3, "#ee2a33");          // red
        }
    }
    
    /*
     * Now the third curve
     */
    x = width - (Math.floor(width / 10) * 3.5);
    var y = 340;
    for (var i = 0; i < 28; i++) {
        x += Math.floor(Math.random() * 30);
        y -= 3;
        
        if (i == 27) {
            badLogins.circle(x, y, 3, "darkgray");
        } else {
            badLogins.circle(x, y, 3, "#ee2a33");          // red
        }
    }
    
    /*
     * Now some random dots to show failed attempts with other users
     */
    x = 125;
    var y = 340;
    for (var i = 0; i < 21; i++) {
        x += Math.max(30, Math.floor(Math.random() * 50));
        badLogins.circle(x, y, 3, "#ee2a33");           // red    
    }
    
    /*
     * Now the pink dots
     */
    x = width - (Math.floor(width / 10) * 3);
    y = 440;
    for (var i = 0; i < 3; i++) {
        x += Math.max(20, Math.floor(Math.random() * 30));
        y -= 5;
        badLogins.circle(x, y, 3, "#f69c9f");           // pink
    }
    
    /*
     * Now the dark green dots
     */
    x = width - (Math.floor(width / 10) * 7);
    y = 440;
    for (var i = 0; i < 3; i++) {
        x += Math.max(40, Math.floor(Math.random() * 80));
        y -= 5;
        badLogins.circle(x, y, 3, "#F00FF0");           // purple
    }
});
