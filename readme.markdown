# VideoObject.js

A small library for embedding HTML5 video in your site that gets around current (as of 3/2010) Webkit implementation bugs.

## Usage

Simply include the VideoObject.js on your page along with [jQuery]("http://jquery.com"). You can create a new VideoObject easily.
	
	var myVO = new VideoObject("#videocontainer", "http://url.to/myvideo.mp4");

## Options

VideoObject.js supports passing an options hash as the 3rd (and optional) parameter. All of the options have defaults, but for the time since we don't read the height and width of the video itself, you'll probably at least want to pass the height and width of your video as options. The default options are listed below:

	height:     200,        // The height of the video in px
    width:      350,        // The width of the video in px
    controls:   false,      // Show the browser-based video controls
    autostart:  false,      // Start the video as soon as it's on the page
    autobuffer: false,      // Buffer the video as soon as the object is created
    loop:       false,      // Loop playback
    posterUrl:  null        // Poster image to display before play is played

## Webkit Bugs

VideoObject.js does it's best to work around the currently buggy implementation of &lt;video&gt; in Webkit. The following bugs are currently handled by VideoObject.js:

* Webkit puts a 4px gap beneath a &lt;video&gt; tag
* Webkit will not fire timeupdate events correctly when autoplay is set to true
* Webkit will not display a poster image for more than a brief flash
* Webkit automatically buffers a video even when autobuffer is set to false

The third and fourth bug are related; the HTML5 spec states that once video data is available, the poster image should no longer be displayed. Since Webkit always autobuffers the video whether we ask it to or not, the poster immediately disappears because video data becomes available.

## Future Features

I plan to add features to VideoObject.js including

* iPhone / iPad support
* Custom controls
* Automatic styling
* Firefox bug workarounds

## Demo

There is a demo included in the demo folder. You need to edit it to use a real video source otherwise nothing will happen.
