#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use dark_light::Mode;

#[tauri::command]
async fn execute_command(command: String, app_handle: tauri::AppHandle) {
    Command::new("cmd")
        .args(&["/c", "start", "cmd.exe", "/k", &command])
        .spawn()
        .expect("Failed to execute command");

    app_handle.exit(0);
}

#[tauri::command]
async fn is_dark_theme() -> bool {
    let mode = dark_light::detect();

    match mode {
        Mode::Dark => true,
        Mode::Light => false,
        Mode::Default => false, // Assume default is light
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            execute_command,
            is_dark_theme
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
