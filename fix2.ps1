$files = Get-ChildItem -Path . -Recurse -Include *.html,*.js
foreach ($f in $files) {
    if ($f.FullName -match '\\\.git\\' -or $f.FullName -match '\\node_modules\\') { continue }
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $original = $content
    
    # We use their unicode hex values. 
    # The mojibake is:
    # â€” = \u00E2\u2014 or something.
    # In C# Replace, we can use the literal strings if the file itself is UTF-8 encoded.
    # Since I am using write_to_file, this script file will be perfectly UTF-8!
    
    $content = $content.Replace("â€”", "-").Replace("â€¦", "...").Replace("â€™", "'").Replace("â”€", "-").Replace("â€“", "-").Replace("â€œ", '"').Replace("â€", '"')
    
    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed $($f.FullName)"
    }
}
