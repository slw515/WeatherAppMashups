(function () {
    var widgetIframe = document.getElementById('sc-widget'),
        widget = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.READY, function () {
        widget.bind(SC.Widget.Events.PLAY, function () {
            // get information about currently playing sound
            widget.getCurrentSound(function (currentSound) {
                console.log('sound ' + currentSound.get('') + 'began to play');
            });
        });
        // get current level of volume
        widget.getVolume(function (volume) {
            console.log('current volume value is ' + volume);
        });
        // set new volume level
        widget.setVolume(50);
        // get the value of the current position
    });

}());

function revealSoundcloud() {
    revealerCount += 1;
    console.log(revealerCount);
    var widgetIframe = document.getElementById('sc-widget');
    var p5canvas = document.getElementById('defaultCanvas0');
    var title = document.getElementById('infoContainer');
    var soundLogo = document.getElementById('soundcloudLogo');
    var soundClose = document.getElementById('closeSoundcloud');
    var bottomTime = document.getElementsByClassName('bottomTime');
    var incrementTimeChildren = title.children;
    if (revealerCount % 2 == 0) {
        soundLogo.style.display = "none";
        soundClose.style.display = "inline";
        widgetIframe.style.display = "inline";
        p5canvas.style.opacity = "0.4";
        title.style.opacity = "0.5";
        // title.style.pointerEvents = "all";
        $("#infoContainer").css( 'pointer-events', 'none' );
        bottomTime.style.opacity = "0.3";
        incrementTimeChildren.style.opacity = "0.6";
        incrementTimeChildren.style.backgroundColor = "yellow";
        console.log("hello");
    }
    else if (revealerCount % 2 == 1) {
        widgetIframe.style.display = "none";
        p5canvas.style.opacity = "1";
        title.style.opacity = "0.8";
        // title.style.pointerEvents = "all";
        $('#infoContainer').css('pointer-events', 'all');
        // $(title).css( 'pointer-events', 'all' );

        soundLogo.style.display = "inline";
        soundClose.style.display = "none";
        bottomTime.style.opacity = "0.5";
        incrementTimeChildren.style.opacity = "1";
    }
}