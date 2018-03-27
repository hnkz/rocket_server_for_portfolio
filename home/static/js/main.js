/*
 * main js file
 */

"use strict";

let bottom = document.getElementById("bottom");

window.onload = function() {
    // typing
    init_typewriter();
    typewrite();

    // now_line
    let pre_prompt = document.getElementById("now_line");
    pre_prompt.innerHTML = pre_prompt_layout.replace(/\#\#\#/g, pre_prompt_text);

    if (is_smartphone()) {

    }
}

function is_smartphone() {
    let ua = navigator.userAgent;
    if (
        ua.indexOf('iPhone') > 0 ||
        ua.indexOf('iPod') > 0 ||
        ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 ||
        ua.indexOf('iPad') > 0 ||
        ua.indexOf('Android') > 0 ||
        window.innerWidth < 500
    ) {
        return true;
    }
}