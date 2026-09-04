
$content = Get-Content exeats.html -Raw
$regex = '(?s)<td data-col="1"><strong>' \+ \(e\.studentName \|\| ''\) \+ '</strong></td>'.*?<td data-col="16"><a href="#">' \+ \(e\.schoolCalendarLabel \|\| ''\) \+ '</a></td>';'
$replacement = '<td data-col="1"><strong>' + (e.studentName || '') + '</strong></td>' +
              '<td data-col="2"><span style="font-family: monospace; font-size: 0.9em; color: #6b85a0;">' + (e.studentId || '') + '</span></td>' +
              '<td data-col="3">' + (e.schoolName || '') + '</td>' +
              '<td data-col="4">' + formatDate(e.startDate) + '</td>' +
              '<td data-col="5">' + (e.duration || '') + '</td>' +
              '<td data-col="6">' + formatDate(e.returnDate) + '</td>' +
              '<td data-col="7">' + (e.notes || '') + '</td>' +
              '<td data-col="8">' + badgeHtml(e.parentConfirmation) + '</td>' +
              '<td data-col="9">' + formatDate(e.prepDeadline) + '</td>' +
              '<td data-col="10">' + (e.toDo || '') + '</td>' +
              '<td data-col="11">' + (e.homestayInfo || '') + '</td>' +
              '<td data-col="12">' + (e.hostName || '') + '</td>' +
              '<td data-col="13">' + (e.hostContact || '') + '</td>' +
              '<td data-col="14">' + (e.transportNotes || '') + '</td>' +
              '<td data-col="15">' + (e.driverName || '') + '</td>' +
              '<td data-col="16">' + (e.driverContact || '') + '</td>' +
              '<td data-col="17"><a href="#">' + (e.schoolCalendarLabel || '') + '</a></td>';'
$content = $content -replace $regex, $replacement

# Now update the Gantt chart snippet
$ganttRegex = '(?s)<span>' \+ e\.studentName \+ '</span>'
$ganttReplacement = '<span>' + e.studentName + ' <span style="font-size:12px; color:#6b85a0; margin-left:6px; font-weight:normal;">' + (e.studentId || '') + '</span></span>'
$content = $content -replace $ganttRegex, $ganttReplacement

Set-Content exeats.html -Value $content

