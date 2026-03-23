$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$content = Join-Path $root "content"

if (Test-Path $content) {
  Remove-Item -Recurse -Force $content
}

New-Item -ItemType Directory -Path $content | Out-Null

# Publish all course content by default.
# Exclude private, build, and tooling directories.
$rootMarkdown = Get-ChildItem $root -File -Filter *.md | Where-Object {
  $_.Name -notlike "*NotebookLM*" -and
  $_.Name -notlike "给新Codex*"
}

foreach ($file in $rootMarkdown) {
  Copy-Item -Force $file.FullName $content
}

$excludedDirs = @(
  ".git",
  ".github",
  ".obsidian",
  ".smart-env",
  "content",
  "node_modules",
  "notebooklm-py",
  "public",
  "quartz",
  "scripts",
  "_quartz_upstream"
)

$publicDirs = Get-ChildItem $root -Directory | Where-Object {
  ($excludedDirs -notcontains $_.Name) -and
  (-not $_.Name.StartsWith("."))
}

foreach ($dir in $publicDirs) {
  $dest = Join-Path $content $dir.Name
  Copy-Item -Recurse -Force $dir.FullName $dest
}
