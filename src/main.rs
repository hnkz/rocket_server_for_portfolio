#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
extern crate rocket_contrib;
extern crate time;

use std::collections::HashMap;
use std::process::Command;
use rocket_contrib::Template;
mod static_files;

#[get("/<name>")]
fn index(name: String) -> Template {
    let context = get_pre_prompt(name, "/".to_string());

    Template::render("index", &context)
}

#[get("/", rank = 2)]
fn index2() -> Template {
    let context = get_pre_prompt("guest".to_string(), "/".to_string());

    Template::render("index", &context)
}

/**
 * Ajax
 */
#[post("/api/ajax/post_pre_prompt")]
fn post_pre_prompt() -> String {
    let hashmap = get_pre_prompt("guest".to_string(), "/".to_string());
    //let pre_prompt = hashmap["user"] + ":" + hashmap["time"] + " " + hashmap["dir"] + " ";
    let user = hashmap.get("user").unwrap();
    let time = hashmap.get("time").unwrap();
    let dir = hashmap.get("dir").unwrap();

    let mut result = String::new();
    result.push_str(user);
    result.push_str(":");
    result.push_str(time);
    result.push_str(" ");
    result.push_str(dir);
    result.push_str(" ");

    result
}

#[post("/api/ajax/post_do_command", data="<cmd>")]
fn post_do_command(cmd: String) -> String {
    println!("cmd is {}", cmd);

    let mut res = do_command(&cmd);
    res = res.replace("\n", "<br>");

    res
}

fn main() {
    rocket::ignite()
        .attach(Template::fairing())
        .mount("/", routes![
            index,
            index2,
            post_pre_prompt,
            post_do_command,
            static_files::all,
        ])
        .launch();
}

fn do_command(cmd: &str) -> String {

    // 文字列処理
    let mut cmd_split = cmd.split_whitespace();

    let program = match cmd_split.next() {
        Some(val) => val,
        None => "help"
    };

    let mut processer = Command::new(program);

    for arg in cmd_split {
        println!("{}", arg);
        processer.arg(arg);
    }

    let result = processer.output();

    match result {
        Ok(val) => {
            String::from_utf8_lossy(&val.stdout).to_string()
        },
        Err(err) => {
            err.to_string()
        }
    }
}

fn get_pre_prompt<'a>(name: String, dir: String) -> HashMap<&'a str, String> {
    let mut context: HashMap<&'a str, String> = HashMap::new();
    let now_string = get_time();

    context.insert("user", name);
    context.insert("time", now_string);
    context.insert("dir", dir);

    context
}

fn get_time() -> String {
    let now_tm = time::now().to_local();
    let now_string = format!("{}:{}:{}",
                             now_tm.tm_hour,
                             now_tm.tm_min,
                             now_tm.tm_sec
    );

    now_string
}
