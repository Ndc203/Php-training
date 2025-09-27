<?php
// helpers.php
function e($str) {
    if ($str === null) return '';
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
