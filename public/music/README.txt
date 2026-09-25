Drop your background music file here, named exactly:

    bgm.mp3

The site loads it from /music/bgm.mp3 (see src/components/MusicPlayer.astro).

Notes
-----
* Any browser-friendly format works; if you use a different extension
  (e.g. .m4a or .ogg), update the SRC constant in
  src/components/MusicPlayer.astro to match.
* Keep the file small (a few MB at most) so the page stays fast.
* Browsers block autoplay with sound until a visitor interacts with the
  page, so the music starts on the visitor's first click / keypress / tap.
  The floating "BGM" button lets anyone play or pause it, and a visitor
  who pauses it will not hear it again automatically.
