// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::atomic::{AtomicBool, Ordering};
use tauri::{Manager, State, WindowEvent};

struct GuardState(AtomicBool);

#[tauri::command]
fn set_guard_mode(window: tauri::WebviewWindow, state: State<'_, GuardState>, active: bool) {
    state.0.store(active, Ordering::SeqCst);
    if active {
        let _ = window.set_decorations(false);
        let _ = window.set_always_on_top(true);
        let _ = window.set_fullscreen(true);
        let _ = window.set_skip_taskbar(true);
        let _ = window.set_focus();
    } else {
        let _ = window.set_fullscreen(false);
        let _ = window.set_always_on_top(false);
        let _ = window.set_decorations(true);
        let _ = window.set_skip_taskbar(false);
    }
}

fn main() {
    tauri::Builder::default()
        .manage(GuardState(AtomicBool::new(false)))
        .invoke_handler(tauri::generate_handler![set_guard_mode])
        .on_window_event(|window, event| {
            let guarding = window
                .try_state::<GuardState>()
                .map(|s| s.0.load(Ordering::SeqCst))
                .unwrap_or(false);
            if !guarding {
                return;
            }
            match event {
                WindowEvent::CloseRequested { api, .. } => {
                    api.prevent_close();
                }
                WindowEvent::Focused(false) => {
                    let _ = window.set_always_on_top(true);
                    let _ = window.set_focus();
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running Pawang Layar");
}

