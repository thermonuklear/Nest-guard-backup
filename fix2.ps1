
$content = Get-Content exeats.html -Raw
$content = $content.Replace(
    "<td data-col=`"2`">", 
    "<td data-col=`"2`"><span style=`"font-family: monospace; font-size: 0.9em; color: #6b85a0;`">`" + (e.studentId || `"`") + `"</span></td><td data-col=`"3`">"
)

# And fix the rest of the indices
for ($i = 16; $i -ge 3; $i--) {
    $next = $i + 1
    $content = $content.Replace("data-col=`"$i`"", "data-col=`"$next`"")
}

$content = $content.Replace(
    "<span>`" + e.studentName + `"</span>",
    "<span>`" + e.studentName + `" <span style=`"font-size:12px; color:#6b85a0; margin-left:6px; font-weight:normal;`">`" + e.studentId + `"</span></span>"
)

Set-Content exeats.html -Value $content

