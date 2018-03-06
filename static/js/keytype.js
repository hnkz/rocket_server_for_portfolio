"use strict";

var type_id = "now_line";
var type_elm;

document.onkeypress = keytype;
document.onkeydown = special_keytype;

/**
 *  input typed key
 */
function keytype() {
    type_elm = document.getElementById(type_id);

    if(type_elm != undefined) {
        type_elm.innerHTML += String.fromCharCode(event.keyCode);
    }
}

/**
 * input special typed key
 *  (e.g. enter, delete, ...)
 */
function special_keytype() {
    type_elm = document.getElementById(type_id);

    // delete
    if(event.keyCode == 8 && type_elm.innerHTML.slice(-2) != "$ ") {
        type_elm.innerHTML = type_elm.innerHTML.slice(0, -1);

    // enter
    } else if(event.keyCode == 13) {
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
