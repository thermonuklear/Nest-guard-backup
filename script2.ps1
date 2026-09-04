
$content = Get-Content exeats.html -Raw

$hTarget = @"
                  <th data-col="0">School Breaks</th>
                  <th data-col="1">Names</th>
                  <th data-col="2">School Name</th>
                  <th data-col="3">Start Date</th>
                  <th data-col="4">Duration (nights)</th>
                  <th data-col="5">Return Date</th>
                  <th data-col="6">Additional Notes</th>
                  <th data-col="7">Confirmation from Parents</th>
                  <th data-col="8">Deadline for Prep</th>
                  <th data-col="9">To Do</th>
                  <th data-col="10">Homestay Info</th>
                  <th data-col="11">Homestay Host Name</th>
                  <th data-col="12">Host Contact</th>
                  <th data-col="13">Transportation Notes</th>
                  <th data-col="14">Driver</th>
                  <th data-col="15">Driver Contact</th>
                  <th data-col="16">School Calendar Link</th>
"@

$hReplace = @"
                  <th data-col="0">School Breaks</th>
                  <th data-col="1">Names</th>
                  <th data-col="2">Student ID</th>
                  <th data-col="3">School Name</th>
                  <th data-col="4">Start Date</th>
                  <th data-col="5">Duration (nights)</th>
                  <th data-col="6">Return Date</th>
                  <th data-col="7">Additional Notes</th>
                  <th data-col="8">Confirmation from Parents</th>
                  <th data-col="9">Deadline for Prep</th>
                  <th data-col="10">To Do</th>
                  <th data-col="11">Homestay Info</th>
                  <th data-col="12">Homestay Host Name</th>
                  <th data-col="13">Host Contact</th>
                  <th data-col="14">Transportation Notes</th>
                  <th data-col="15">Driver</th>
                  <th data-col="16">Driver Contact</th>
                  <th data-col="17">School Calendar Link</th>
"@

$content = $content.Replace($hTarget.Replace("`r`n","`n"), $hReplace.Replace("`r`n","`n")).Replace($hTarget, $hReplace)

Set-Content exeats.html -Value $content

