"use strict";

let ids = ["normal_desc"];
let elm_count = 0;

let text = [];
let elm = [];
let text_count = [];

function init_typewriter() {
    let class_elm_count = 0;

    for (let i = 0; i < ids.length; i++) {
        elm[i + class_elm_count] = document.getElementById(ids[i]);

        // class
        if (elm[i + class_elm_count] == undefined) {
            let tmp_elm = document.getElementsByClassName(ids[i]);

            for (let j = 0; j < tmp_elm.length; j++) {
                elm[i + class_elm_count + j] = tmp_elm[j];
                text[i + class_elm_count + j] = elm[i + class_elm_count + j].innerHTML;
                text_count[i + class_elm_count + j] = 0;
                elm[i + class_elm_count + j].innerHTML = '';
            }
            class_elm_count += tmp_elm.length;
        } else {
            text[i + class_elm_count] = elm[i + class_elm_count].innerHTML;
            text_count[i + class_elm_count] = 0;
            elm[i + class_elm_count].innerHTML = '';
        }
    }
}

function typewrite() {
    elm[elm_count].innerHTML = text[elm_count].substr(0, ++text_count[elm_count]) + "<span id=\"cursor\">_</span>";

    if (text_count[elm_count] == text[elm_count].length) {
        elm[elm_count].innerHTML = text[elm_count].substr(0, ++text_count[elm_count]);
        elm_count++;
        if (elm_count != elm.length) {
            setTimeout("typewrite()", 7);
        }
    } else {
        setTimeout("typewrite()", 7);
    }
}