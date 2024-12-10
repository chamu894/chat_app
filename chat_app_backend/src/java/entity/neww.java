interface Player {

    void play();
}

class OldMediaPlayer {

    public void playOld() {
        System.out.println("Old Media Player");
    }
}

class MediaPlayerAdapter implements Player {

    private OldMediaPlayer oldPlayer;

    public MediaPlayerAdapter(OldMediaPlayer oldPlayer) {
        this.oldPlayer = oldPlayer;
    }

    @Override
    public void play() {
        oldPlayer.playOld();
    }
}

class Main {

    public static void main(String[] args) {
        OldMediaPlayer oldPlayer = new OldMediaPlayer();
        Player adaptedPlayer = new MediaPlayerAdapter(oldPlayer);
        adaptedPlayer.play();
    }
}
