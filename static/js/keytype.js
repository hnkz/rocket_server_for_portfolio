"use strict";

var type_id = "now_line";
var type_elm;
var keycode;

document.onkeypress = keytype;
document.onkeydown = special_keytype;

/**
 *  input typed key
 */
function keytype(event) {
    console.log("keytype:");
    console.log(event);

    if (get_browser() == "Firefox") {
        keycode = event.charCode;
    } else {
        keycode = event.keyCode;
    }

    type_elm = document.getElementById(type_id);

    if (type_elm != undefined) {
        type_elm.innerHTML += String.fromCharCode(keycode);
    }
}

/**
 * input special typed key
 *  (e.g. enter, delete, ...)
 */
function special_keytype(event) {
    console.log("special_keytype:");
    console.log(event);

    type_elm = document.getElementById(type_id);

    keycode = event.keyCode;

    // delete
    if (keycode == 8) {
        if (type_elm.innerHTML.slice(-2) != "$ ") {
            type_elm.innerHTML = type_elm.innerHTML.slice(0, -1);
        }
        return false;

        // enter
    } else if (keycode == 13) {
        var command = type_elm.innerHTML.replace(/.*\$ /g, "");

        // get response
        post_ajax_call("/api/ajax/post_do_command", command).then((result) => {
                console.log(result);
                type_elm.innerHTML += "<br>" + result;
                console.log(type_elm.innerHTML);

                // scroll bottom
                bottom.scrollIntoView(true);
                return post_ajax_call("/api/ajax/post_pre_prompt", "");
            })
            .then((result) => {
                pre_prompt_text = result;

                // create element
                var new_now_line = document.createElement("span");
                new_now_line.id = "now_line";
                new_now_line.innerHTML = pre_prompt_layout.replace(/\#\#\#/g, pre_prompt_text);

                // add element
                type_elm.parentNode.insertBefore(new_now_line, type_elm.nextSibling);

                // remove element
                type_elm.removeAttribute("id");

            })
            .catch((err) => {
                console.log("error: " + err);
            })
    }
}

function get_browser() {
    var userAgent = window.navigator.userAgent;

    // key type
    console.log(userAgent);
    if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
        return "msie";
    } else if (userAgent.indexOf('Edge') != -1) {
        return "Edge";
    } else if (userAgent.indexOf('Chrome') != -1) {
        return "Chrome";
    } else if (userAgent.indexOf('Safari') != -1) {
        return "Safari";
    } else if (userAgent.indexOf('Firefox') != -1) {
        return "Firefox";
    } else if (userAgent.indexOf('opera') != -1) {
        return "Opera";
    } else {
        return "Other";
    }
}