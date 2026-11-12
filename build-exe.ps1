$ErrorActionPreference = "Stop"

$src = $PSScriptRoot
$dst = "$env:USERPROFILE\.penjagalayar-src"

Write-Host "==> Menyalin aset web ke folder build sementara..." -ForegroundColor Cyan
Remove-Item "$dst\dist" -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path "$dst\dist\assets\suara" -Force | Out-Null
Copy-Item "$src\index.html", "$src\galeri.html" -Destination "$dst\dist" -Force
Copy-Item "$src\css" -Destination "$dst\dist\css" -Recurse -Force
Copy-Item "$src\js" -Destination "$dst\dist\js" -Recurse -Force
Copy-Item "$src\assets\icon-*.png" -Destination "$dst\dist\assets" -Force
Copy-Item "$src\assets\suara\*" -Destination "$dst\dist\assets\suara" -Recurse -Force
Copy-Item "$src\src-tauri" -Destination "$dst\src-tauri" -Recurse -Force

$env:PATH = "$env:USERPROFILE\.cargo\bin;$env:USERPROFILE\.llvm-mingw\bin;$env:PATH"
$env:CARGO_TARGET_DIR = "$env:USERPROFILE\.tauri-target"

Write-Host "==> Mengompilasi Tauri EXE (Pawang Layar)..." -ForegroundColor Cyan
Push-Location "$dst\src-tauri"
try {
    cargo build --release
} finally {
    Pop-Location
}

New-Item -ItemType Directory -Path "$src\release-exe" -Force | Out-Null
Copy-Item "$env:USERPROFILE\.tauri-target\release\pawang-layar.exe" "$src\release-exe\Pawang Layar.exe" -Force
& "$env:USERPROFILE\.llvm-mingw\bin\x86_64-w64-mingw32-strip.exe" "$src\release-exe\Pawang Layar.exe"

$wv2 = Get-ChildItem "$env:USERPROFILE\.tauri-target\release\build\webview2-com-sys-*\out\x64\WebView2Loader.dll" | Select-Object -First 1
if ($wv2) {
    Copy-Item $wv2.FullName "$src\release-exe\WebView2Loader.dll" -Force
}

Compress-Archive -Path "$src\release-exe\*" -DestinationPath "$src\Pawang-Layar-Windows.zip" -Force

Write-Host "`n==> Selesai! File siap di:" -ForegroundColor Green
Write-Host "    EXE : $src\release-exe\Pawang Layar.exe"
Write-Host "    ZIP : $src\Pawang-Layar-Windows.zip"

