<?php
require_once 'models/UserModel.php';
$userModel = new UserModel();

$user = NULL; //Add new user
$id = NULL;

if (!empty($_GET['id'])) {
    $id = htmlspecialchars($_GET['id'], ENT_QUOTES, 'UTF-8');
    $userModel->deleteUserById($id);//Delete existing user
}
header('location: list_users.php');
?>