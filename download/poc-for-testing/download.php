<?php
$file = 'notmalware.exe';
header('Content-Disposition: attachment; filename="'.basename($file).'"');
header('Cache-Control: must-revalidate');
echo readfile('./bad_app_file_on_scan.exe')
?>