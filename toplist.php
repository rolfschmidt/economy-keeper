<?php
header('Access-Control-Allow-Origin: *');

$toplist = json_decode(file_get_contents('toplist.json'), true);

if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    $name   = $_POST['name'];
    $points = (int) $_POST['points'];

    if (!preg_match('/^[a-zA-Z0-9_-]+$/', $name) || strlen($name) > 30) {
        $name = 'anonymous';
    }
    if ( $points < 1000000000 ) {
        $toplist[] = array('name' => $name, 'points' => $points);
    }
}

function sort_toplist($a, $b) {
    if ( $a['points'] == $b['points'] ) return 0;
    return $a['points'] < $b['points'] ? 1 : 0;
}

usort($toplist, 'sort_toplist');

$toplist = array_splice($toplist, 0, 20);
$toplist_encoded = json_encode($toplist);

file_put_contents('toplist.json', $toplist_encoded);

print $toplist_encoded;

?>