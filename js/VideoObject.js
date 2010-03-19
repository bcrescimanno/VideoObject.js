/*
 * VideoObject.js
 * Version 0.1
 * Author Brian Crescimanno <brian.crescimanno@gmail.com>
 * http://briancrescimanno.com
 *
 * A simple wrapper for creating HTML5 video objects and adding them 
 * to an element on a page. Tries to deal with some of the common
 * bugs that exist in <video> tag implementations--especially in Webkit
 *
 * See the README.markdown for addressed bugs
 * 
 * Usage: var myVO = new VideoObject("#videoWrapper", "http://myvideosite.com/video.mp4")
 *
 * Depends on jQuery >= 1.4.0
 *
 * License: Creative Commons Attribution-Share Alike 3.0 United States
 * http://creativecommons.org/licenses/by-sa/3.0/us/
 */
 
var VideoObject = (function($) {

    VideoObject = function(context, videoUrl, options) {
        this.init(context, videoUrl, options);
    }

    VideoObject.prototype = {

        /* 
         * The constructor takes an options hash that can
         * override the defaults. You can find the defaults
         * below in extendOptions
         */
        init: function(context, videoUrl, options) {
            this.context = context;
            this.videoUrl = videoUrl;
            this.options = this.extendOptions((options || {}));
            this.loaded = false;
            
            this.video = $("<video />");
            
            if(this.options.posterUrl && !this.options.autostart) {
                this.showPoster();
            } else if(this.options.autostart) {
                this.startVideo();
            }
        
        },
        
        startVideo: function() {
            console.debug('start video called');
            if(!this.loaded) {
                //we'll call play once the video loads...
                this.loaded = true;
                this.video.bind("canplay", $.proxy(this.playVideo, this));
                this.loadVideo(false);
            } else {
                this.playVideo();
            }  
        },
        
        loadVideo: function(startPlayback) {
            if(this.poster) {
                this.poster.remove();
            }
                        
            this.createVideoTag().appendTo(this.context);
            
        },
        
        playVideo: function() {
            if(this.video[0].readyState > 2) {
                this.video[0].play();
            }  
        },
        
        createVideoTag: function() {
            return this.video.attr("src", this.videoUrl)
                .attr("autobuffer", this.options.autobuffer)
                .attr("height", this.options.height)
                .attr("width", this.options.width)
                .attr("controls", this.options.controls)
                .attr("loop", this.options.loop)
                // Set autoplay to false, Webkit will not fire timeupdate events
                // correctly for autoplayed videos.
                .attr("autoplay", false)
                // Webkit puts a 4px gap beneath the video tag by default
                // Negative margin defeats this bug
                .css("margin", "0 0 -4px 0")
                .css("padding", 0)
                .css("border", 0);
        },
        
        /*
         * There is a bug in webkit that causes the autobuffer option to be
         * ignored. Because it is ignored, all videos autobuffer. That means
         * the "poster" attribute cannot work because once a video has data
         * it is not supposed to show the poster per the spec. Here, we create
         * "poster" using an image
         *
         */
        showPoster: function() {
            return this.poster = $("<img />").attr("src", this.options.posterUrl)
                .attr("height", this.options.height)
                .attr("width", this.options.width)
                .click($.proxy(this.startVideo, this))
                .appendTo(this.context);
        },
        
        extendOptions: function(options) {
            return $.extend({
                height:     200,        // The height of the video in px
                width:      350,        // The width of the video in px
                controls:   false,      // Show the browser-based video controls
                autostart:  false,      // Start the video as soon as it's on the page
                autobuffer: false,      // Buffer the video as soon as the object is created
                loop:       false,      // Loop playback
                posterUrl:  null        // Poster image to display before play is selected
            }, options);
        }        
    }
    
    return VideoObject;
    
})(jQuery);