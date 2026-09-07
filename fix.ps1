$files = Get-ChildItem -Path . -Recurse -Include *.html,*.js
foreach ($f in $files) {
    if ($f.FullName -match '\.git') { continue }
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $original = $content
    $content = $content.Replace("â€”", "-").Replace("â€¦", "...").Replace("â€™", "'").Replace("â”€", "-").Replace("â€“", "-")
    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed $($f.FullName)"
    }
}
