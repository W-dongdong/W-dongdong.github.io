Background music
================

Drop your audio files in THIS folder (src/assets/music/).

That's all you need to do:

  * Every audio file here is picked up automatically at build time.
  * Files are sorted by filename and played in order, then the whole
    list loops.
  * Name them with a numeric prefix to control the order, e.g.

        01-intro.mp3
        02-main-theme.mp3
        03-outro.mp3

  * The filename (without extension and without the leading number)
    is shown as the track title on the site's BGM button.

Supported extensions: .mp3  .m4a  .ogg  .opus  .wav  .flac  .aac

Notes
-----
* Files here are committed to the repo and served publicly from the
  site, so only use music you have the right to publish. Keep each file
  to a few MB so the page stays fast.
* Adding or removing a track requires a rebuild: commit + push, and the
  GitHub Action will redeploy. The player hides itself completely while
  this folder has no audio files.
* Browsers block autoplay with sound until a visitor interacts with the
  page, so playback starts on their first click / keypress / tap. The
  floating button lets anyone play or pause, and a visitor who pauses
  will not hear it again automatically.
