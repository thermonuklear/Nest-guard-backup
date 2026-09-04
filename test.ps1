 = New-Object -ComObject ScriptControl; .Language = 'JScript';  = Get-Content assets/db.js -Raw; .AddCode(); Write-Host 'Syntax OK'
