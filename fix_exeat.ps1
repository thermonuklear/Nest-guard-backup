
$content = Get-Content exeats.html -Raw

$content = $content -replace '<th data-col="1">Names</th>', '<th data-col="1">Names</th>
                  <th data-col="2">Student ID</th>'
$content = $content -replace '<th data-col="2">School Name</th>', '<th data-col="3">School Name</th>'
$content = $content -replace '<th data-col="3">Start Date</th>', '<th data-col="4">Start Date</th>'
$content = $content -replace '<th data-col="4">Duration \(nights\)</th>', '<th data-col="5">Duration (nights)</th>'
$content = $content -replace '<th data-col="5">Return Date</th>', '<th data-col="6">Return Date</th>'
$content = $content -replace '<th data-col="6">Additional Notes</th>', '<th data-col="7">Additional Notes</th>'
$content = $content -replace '<th data-col="7">Confirmation from Parents</th>', '<th data-col="8">Confirmation from Parents</th>'
$content = $content -replace '<th data-col="8">Deadline for Prep</th>', '<th data-col="9">Deadline for Prep</th>'
$content = $content -replace '<th data-col="9">To Do</th>', '<th data-col="10">To Do</th>'
$content = $content -replace '<th data-col="10">Homestay Info</th>', '<th data-col="11">Homestay Info</th>'
$content = $content -replace '<th data-col="11">Homestay Host Name</th>', '<th data-col="12">Homestay Host Name</th>'
$content = $content -replace '<th data-col="12">Host Contact</th>', '<th data-col="13">Host Contact</th>'
$content = $content -replace '<th data-col="13">Transportation Notes</th>', '<th data-col="14">Transportation Notes</th>'
$content = $content -replace '<th data-col="14">Driver</th>', '<th data-col="15">Driver</th>'
$content = $content -replace '<th data-col="15">Driver Contact</th>', '<th data-col="16">Driver Contact</th>'
$content = $content -replace '<th data-col="16">School Calendar Link</th>', '<th data-col="17">School Calendar Link</th>'

$content = $content -replace '<td data-col="1"><strong>' \+ \(e.studentName \|\| ''\) \+ '</strong></td>' \+', '<td data-col="1"><strong>' + (e.studentName || '') + '</strong></td>' +
              '<td data-col="2"><span style="font-family: monospace; font-size: 0.9em; color: #6b85a0;">' + (e.studentId || '') + '</span></td>' +'
$content = $content -replace '<td data-col="2">' \+ \(e.schoolName \|\| ''\) \+ '</td>' \+', '<td data-col="3">' + (e.schoolName || '') + '</td>' +'
$content = $content -replace '<td data-col="3">' \+ formatDate\(e.startDate\) \+ '</td>' \+', '<td data-col="4">' + formatDate(e.startDate) + '</td>' +'
$content = $content -replace '<td data-col="4">' \+ \(e.duration \|\| ''\) \+ '</td>' \+', '<td data-col="5">' + (e.duration || '') + '</td>' +'
$content = $content -replace '<td data-col="5">' \+ formatDate\(e.returnDate\) \+ '</td>' \+', '<td data-col="6">' + formatDate(e.returnDate) + '</td>' +'
$content = $content -replace '<td data-col="6">' \+ \(e.notes \|\| ''\) \+ '</td>' \+', '<td data-col="7">' + (e.notes || '') + '</td>' +'
$content = $content -replace '<td data-col="7">' \+ badgeHtml\(e.parentConfirmation\) \+ '</td>' \+', '<td data-col="8">' + badgeHtml(e.parentConfirmation) + '</td>' +'
$content = $content -replace '<td data-col="8">' \+ formatDate\(e.prepDeadline\) \+ '</td>' \+', '<td data-col="9">' + formatDate(e.prepDeadline) + '</td>' +'
$content = $content -replace '<td data-col="9">' \+ \(e.toDo \|\| ''\) \+ '</td>' \+', '<td data-col="10">' + (e.toDo || '') + '</td>' +'
$content = $content -replace '<td data-col="10">' \+ \(e.homestayInfo \|\| ''\) \+ '</td>' \+', '<td data-col="11">' + (e.homestayInfo || '') + '</td>' +'
$content = $content -replace '<td data-col="11">' \+ \(e.hostName \|\| ''\) \+ '</td>' \+', '<td data-col="12">' + (e.hostName || '') + '</td>' +'
$content = $content -replace '<td data-col="12">' \+ \(e.hostContact \|\| ''\) \+ '</td>' \+', '<td data-col="13">' + (e.hostContact || '') + '</td>' +'
$content = $content -replace '<td data-col="13">' \+ \(e.transportNotes \|\| ''\) \+ '</td>' \+', '<td data-col="14">' + (e.transportNotes || '') + '</td>' +'
$content = $content -replace '<td data-col="14">' \+ \(e.driverName \|\| ''\) \+ '</td>' \+', '<td data-col="15">' + (e.driverName || '') + '</td>' +'
$content = $content -replace '<td data-col="15">' \+ \(e.driverContact \|\| ''\) \+ '</td>' \+', '<td data-col="16">' + (e.driverContact || '') + '</td>' +'
$content = $content -replace '<td data-col="16"><a href="#">' \+ \(e.schoolCalendarLabel \|\| ''\) \+ '</a></td>';', '<td data-col="17"><a href="#">' + (e.schoolCalendarLabel || '') + '</a></td>';'

$content = $content -replace "'<span>' \+ e\.studentName \+ '</span>' \+", "'<span>' + e.studentName + ' <span style=\""font-size:12px; color:#6b85a0; margin-left:6px; font-weight:normal;\"">' + e.studentId + '</span></span>' +"

Set-Content exeats.html -Value $content

