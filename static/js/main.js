/*
 * main js file
 */

"use strict";

var bottom = document.getElementById("bottom");

window.onload = function() {
    // typing
    init_typewriter();
    typewrite();

    // now_line
    var pre_prompt = document.getElementById("now_line");
    pre_prompt.innerHTML = pre_prompt_layout.replace(/\#\#\#/g, pre_prompt_text);
}