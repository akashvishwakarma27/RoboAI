//package com.masai.exception;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//
//@ControllerAdvice
//public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
//
//    @ExceptionHandler(HttpClientErrorException.TooManyRequests.class)
//    public ResponseEntity<String> handleRateLimitExceeded(HttpClientErrorException.TooManyRequests e) {
//        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("limit exceeded. Please try again later.");
//    }
//        
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleOtherExceptions(Exception e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing your request.");
//    }
//}
