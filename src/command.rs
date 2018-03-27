
pub struct Command {
    cmd: String,
    result: Option<String>,
}

impl Command {
    pub fn new(cmd: String) -> Command {
        Command {
            cmd: cmd,
            result: None,
        }
    }

}