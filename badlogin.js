z = {
    drawHLine: function(x, y, length) {
        var path1 = "M " + x + " " + y + " L " + length + " " + y;
        z.r.path(path1).attr({"stroke-width": 1, "stroke": "black"});
    },
    
    drawVLine: function(x, y, length) {
        var path1 = "M " + x + " " + y + " L " + x + " " + length;
        z.r.path(path1).attr({"stroke-width": 1, "stroke": "black"});
    },
    
    showPopup: function(x, y, text) {
         x += 5;
         y += 5;
         
         $('#popup').html(text);
         
         $('#popup').css( {
             left: x + 'px',
             top: y + 'px'
             
         }).show('fast');
    },
    
    hidePopup: function() {
         $('#popup').hide('slow');
    },
    
    circle: function(x, y, radius, color) {
         return z.r.circle(x, y, radius).attr({fill: color, "stroke-width": 0})
            .mouseover(function (event) {
                this.animate({r: 8}, 200, function() {
                    z.showPopup(this.getBBox().x, this.getBBox().y, "IDM<br />164.99.212.125<br />admin<br />11:15 AM, September 1, 2010");
                });
            }).mouseout(function (event) {
                this.animate({r: 3}, 200);
                z.hidePopup();
            }).click(function (event) {
                z.output("click...");
            });
         
    },
    
    output: function(msg) {
         if (window.console) {
             console.info(msg);
         }
    }
    
}


jQuery(document).ready(function(){
    
    z.r = Raphael("holder", '100%', '100%');
    
    var width = $('#holder').width() - 50;
    
    for (var y = 50; y < 400; y += 100) {
        z.drawHLine(100, y, width);
    }
    
    /*
     * We'll start with all of our successfull logins
     */
    for (var i = 0; i < 20; i++) {
        z.circle(Math.max(125, Math.floor(Math.random() * width)), 140, 3, "darkgray");
    }
    
    for (var i = 0; i < 10; i++) {
        z.circle(Math.max(125, Math.floor(Math.random() * width)), 240, 3, "darkgray");
    }
    
    for (var i = 0; i < 23; i++) {
        z.circle(Math.max(125, Math.floor(Math.random() * width)), 340, 3, "darkgray");
    }
    
    /*
     * Now a user with a bad password in Windows
     */
    for (var i = 0; i < 500; i++) {
        z.circle(Math.max(125, Math.floor(Math.random() * width)), 60, 3, "#CC6633");
    }
    
    for (var i = 0; i < 500; i++) {
        z.circle(Math.max(125, Math.floor(Math.random() * width)), 160, 3, "#CC6633");
    }
    
    for (var i = 0; i < 500; i++) {
        z.circle(Math.max(125, Math.floor(Math.random() * width)), 260, 3, "#CC6633");
    }
    
    
    /*
     * Now the orange dots
     */
    var x = 150;
    for (var i = 0; i < 5; i++) {
        x += Math.floor(Math.random() * 15);
        z.circle(x, 140, 3, "orange");
    }
    
    /*
     * Now the cyan dots
     */
    x = Math.floor(width / 2);
    for (var i = 0; i < 3; i++) {
        x += Math.floor(Math.random() * 15);
        z.circle(x, 140, 3, "cyan");
    }
    
    x += Math.floor(width / 10);
    z.circle(x, 130, 3, "cyan");
    
    
    /*
     * Now the green dots
     */
    x = width - (Math.floor(width / 10) * 4);
    var y = 140;
    for (var i = 0; i < 15; i++) {
        x += Math.floor(Math.random() * 30);
        y -= 5;
        
        z.circle(x, y, 3, "green");
    }
    
    /*
     * Now the yellow dots
     */
    x = width - (Math.floor(width / 10) * 7);
    y = 240;
    for (var i = 0; i < 5; i++) {
        x += Math.max(10, Math.floor(Math.random() * 20));
        y -= 5;
        
        z.circle(x, y, 3, "gold");
    }
    
    x += Math.max(60, Math.floor(Math.random() * 80));
    z.circle(x, y - 5, 3, "gold");
    
    /*
     * Now the blue dots
     */
    x = width - (Math.floor(width / 10) * 6);
    y = 240;
    for (var i = 0; i < 5; i++) {
        x += Math.max(60, Math.floor(Math.random() * 80));
        y -= 5;
        
        z.circle(x, y, 3, "blue");
    }
    
    /*
     * Now the purple dots
     */
    x = width - (Math.floor(width / 10) * 3);
    y = 340;
    for (var i = 0; i < 3; i++) {
        x += Math.max(20, Math.floor(Math.random() * 30));
        z.circle(x, y, 3, "purple");
    }
    
    /*
     * Now the red dots.  We'll start with the first curve
     */
    x = width - (Math.floor(width / 10) * 8.5);
    var y = 340;
    for (var i = 0; i < 25; i++) {
        x += Math.floor(Math.random() * 30);
        y -= 3;
        
        z.circle(x, y, 3, "red");
    }
    
    /*
     * Now the second curve
     */
    x = width - (Math.floor(width / 10) * 4.5);
    var y = 340;
    for (var i = 0; i < 22; i++) {
        x += Math.floor(Math.random() * 30);
        y -= 3;
        
        z.circle(x, y, 3, "red");
    }
    
    /*
     * Now some random dots to show failed attempts with other users
     */
    x = 125;
    var y = 340;
    for (var i = 0; i < 21; i++) {
        x += Math.max(30, Math.floor(Math.random() * 50));
        z.circle(x, y, 3, "red");
    }
});
