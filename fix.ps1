
$content = Get-Content drivers.html -Raw

# Fix page-title and chrome-route
$content = $content -replace "document\.getElementById\('page-title'\)\.textContent", "if(document.getElementById('page-title')) document.getElementById('page-title').textContent"
$content = $content -replace "document\.getElementById\('chrome-route'\)\.textContent", "if(document.getElementById('chrome-route')) document.getElementById('chrome-route').textContent"

# Fix driver-avatar, driver-name, driver-subtitle
$content = $content -replace "document\.getElementById\('driver-avatar'\)\.textContent", "if(document.getElementById('driver-avatar')) document.getElementById('driver-avatar').textContent"
$content = $content -replace "document\.getElementById\('driver-name'\)\.innerHTML", "if(document.getElementById('driver-name')) document.getElementById('driver-name').innerHTML"
$content = $content -replace "document\.getElementById\('driver-subtitle'\)\.textContent", "if(document.getElementById('driver-subtitle')) document.getElementById('driver-subtitle').textContent"

# Fix chipsEl
$content = $content -replace "chipsEl\.innerHTML =", "if(chipsEl) chipsEl.innerHTML ="

# Fix timelineEl
$content = $content -replace "timelineEl\.innerHTML =", "if(timelineEl) timelineEl.innerHTML ="

# Fix driver-travel-list
$content = $content -replace "var listEl = document\.getElementById\('driver-travel-list'\);", "var listEl = document.getElementById('driver-travel-list'); if(!listEl) return;"

# Fix upload-btn
$content = $content -replace "document\.getElementById\(options\.btnId\)\.addEventListener", "if(document.getElementById(options.btnId)) document.getElementById(options.btnId).addEventListener"

Set-Content drivers.html -Value $content

