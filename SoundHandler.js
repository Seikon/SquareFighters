function SoundHandler() {

}

SoundHandler.prototype.playAudio = function(source) {

    var audio = new Audio(source);
    audio.play();
}
