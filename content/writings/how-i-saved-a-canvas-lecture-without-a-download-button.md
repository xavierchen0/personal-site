+++
date = '2026-11-28T18:33:28+08:00'
draft = false
title = 'How I Saved a Canvas Lecture Without a Download Button'
+++

If you are a NUS student (or any student that uses the Canvas Learning
Management System (LMS)), you are probably familiar with Canvas' Panopto and
MediaWeb. It is the place you go to watch your past lectures online.

I personally use it very frequently to better understand the lecture content or
catch any course administrative details that I might have missed during class.
Plus, you can watch the lecture at 2x speed, saving you 50% of the lecture time.
As a student myself, it is a really invaluable tool to aid my learning.

However, the thing that really bugs me is that I am **limited to 2x speed**!
Sometimes, I know my lecturer is just talking fluff, or I am already familiar
with the content, and I just want to blitz through that section of the lecture,
but still listening in just in case I might have missed anything.

Another thing that bugs me is that Panopto **does not have a lecture summary
feature**, something like the summary Zoom generate at the end of a meeting. I
have always liked that feature because it provides a brief, yet sufficiently
detailed, summary, allowing you to better understand the main point and know
what to expect next. It also helps you see at a high level how several main
points are connected to one another.

Hence, the solution I have come up with is to download the lecture from Canvas.
I can then watch the video on any video player while choosing my desired
playback speed, or pass it to an AI agent for a summary. In fact, I use
[VLC](https://www.videolan.org/) and you can even watch the lecture at the
maximum 31.25x speed (I tried once ... I finished a 2hr lecture in 4 minutes,
but didn't understand anything LOL).

But, Canvas does not provide a download button, so I will show you here how to
download a lecture video from Canvas.

_Disclaimer: This is for educational purposes only. Doing so may violate
Canvas's Terms and Conditions, so proceed at your own risk. I assume no
responsibility for any consequences arising from your actions. You should also
not distribute any videos you download from this approach._

---

# Step 1

Download [FFmpeg](https://www.ffmpeg.org/). FFmpeg is a free, open-source
command-line tool that allows you to download, convert, and process video and
audio files.

Fun fact (or perhaps not so fun): FFmpeg is heavily relied upon by some of the
world's largest tech companies (like Google, Netflix, and Meta), yet its
developers have publicly expressed their frustration over the lack of financial
support they receive from these corporations. You can read more about it from
[here](https://opensourcepledge.com/blog/the-philosophy-of-the-open-source-pledge/).

If you use macOS with [homebrew](https://brew.sh/) like me, you can just
download like so:

```bash
brew install ffmpeg
```

---

# Step 2

Go to the video lecture on Canvas.

![NUS Panopto/MediaWeb video player](/images/writings/canvas_video_player.webp)

---

# Step 3

Press F12 to open the browser Developer Tools. Then open the "Network" tab.

![A red arrow points to the Network tab](/images/writings/canvas_video_player_network.webp)

---

# Step 4

Refresh the page and you should see things start to load in the "Network" tab.

Filter for "m3u8" and find "index.m3u8". The m3u8 file does not contain the
entire lecture video, but instead stores references to smaller video segments,
which FFmpeg can later retrieve and combine into a single video file. This file
allows Panopto video player to be able to load video segments on demand without
needing to download the entire video upfront.

![A red arrow points to m3u8 and index.m3u8](/images/writings/canvas_video_player_m3u8.webp)

# Step 5

Right-click on the file "index.m3u8" and select "Copy Value" > "Copy URL".

![A red arrow point to Copy Value and Copy URL of index.m3u8](/images/writings/canvas_video_player_copy_url.webp)

# Step 6

Now, take the URL you copied and open up the Terminal. Go to the directory you
want to keep the file at, then run the command below.

```bash
ffmpeg -i "<The M3U8_URL you copied>" -c copy <Your desired file name>.mp4
```

You will be bombarded with a wall of text but don't worry, those are just log
messages. It just means FFmpeg is processing the video file.

For a 50 minute lecture video that I tested, the process took less than 5
seconds, but it might vary depending on your internet connection and the length
of the lecture video.

Now you're done! You have a fully downloaded video file, and what you want to do
with it is up to you.

Note that this method might not work for every online lecture video as it also
depends on how the video file is stored in Canvas, but in my own uses, it has
worked out pretty well for all my classes.

Good day!
