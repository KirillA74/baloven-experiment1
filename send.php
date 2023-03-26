<?php

/**
 * This example shows making an SMTP connection with authentication.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
// date_default_timezone_set('Etc/UTC');

// require '../vendor/autoload.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
require 'phpmailer/POP3.php';
require 'phpmailer/OAuthTokenProvider.php';
require 'phpmailer/OAuth.php';
// require 'phpmailer/get_oauth_token.php';

// my code
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$address = $_POST['user_address'];
$text = $_POST['user_text'];

// Формирование самого письма
// $title = "Заголовок письма";
// $body = "New email for you!";

//Create a new PHPMailer instance
$mail = new PHPMailer();
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
//SMTP::DEBUG_OFF = off (for production use)
//SMTP::DEBUG_CLIENT = client messages
//SMTP::DEBUG_SERVER = client and server messages
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
//Set the hostname of the mail server
$mail->Host = 'mail.piroginazakaz74.ru';
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 465;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = 'info@piroginazakaz74.ru';
//Password to use for SMTP authentication
$mail->Password = 'wF1jZ6aJ0d';
//Set who the message is to be sent from
$mail->setFrom('info@piroginazakaz74.ru');
//Set an alternative reply-to address
$mail->addReplyTo('chelfocus@mail.ru');
//Set who the message is to be sent to
$mail->addAddress('chelfocus@mail.ru');
//Set the subject line
$mail->Subject = 'Новый заказ';
$mail->Body = 'текст сообщения';
$mail->isHTML(false); 
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $mail->msgHTML(file_get_contents('contents.html'), __DIR__);
// Replace the plain text body with one created manually
$mail->AltBody = 'Письмишко';
//Attach an image file
// $mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}