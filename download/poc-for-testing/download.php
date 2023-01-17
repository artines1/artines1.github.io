<?php
$file = 'content.exe';
header('Content-Disposition: attachment; filename="'.basename($file).'"');
header('Cache-Control: must-revalidate');
echo readfile('./content.exe')
?>