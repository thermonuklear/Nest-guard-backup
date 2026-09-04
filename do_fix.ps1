
$content = [System.IO.File]::ReadAllText("exeats.html")
$target = "            tr.innerHTML =
              '<td data-col=`"0`">' + (e.breakType || '') + '</td>' +
              '<td data-col=`"1`"><strong>' + (e.studentName || '') + '</strong></td>' +
              '<td data-col=`"2`">' + (e.schoolName || '') + '</td>'"
$replacement = "            tr.innerHTML =
              '<td data-col=`"0`">' + (e.breakType || '') + '</td>' +
              '<td data-col=`"1`"><strong>' + (e.studentName || '') + '</strong></td>' +
              '<td data-col=`"2`"><span style=`"font-family: monospace; font-size: 0.9em; color: #6b85a0;`">' + (e.studentId || '') + '</span></td>' +
              '<td data-col=`"3`">' + (e.schoolName || '') + '</td>'"
$content = $content.Replace($target, $replacement)

# Update other data-cols
for ($i = 16; $i -ge 3; $i--) {
    $next = $i + 1
    $targetDataCol = "data-col=`"$i`">' + (e"
    $replaceDataCol = "data-col=`"$next`">' + (e"
    $content = $content.Replace($targetDataCol, $replaceDataCol)
}
# specifically for schoolCalendarLabel
$content = $content.Replace("data-col=`"16`"><a", "data-col=`"17`"><a")

$targetGantt = "'<span>' + e.studentName + '</span>' +"
$replacementGantt = "'<span>' + e.studentName + ' <span style=`"font-size:12px; color:#6b85a0; margin-left:6px; font-weight:normal;`">' + e.studentId + '</span></span>' +"
$content = $content.Replace($targetGantt, $replacementGantt)

[System.IO.File]::WriteAllText("exeats.html", $content)

