package com.masai.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.masai.dto.ChatGPTRequest;
import com.masai.dto.ChatGptResponse;

@RestController
@RequestMapping("/bot")
public class CustomBotController {

    @Value("${openai.model}")
    private String model;

    @Value(("${openai.api.url}"))
    private String apiURL;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/chat")
    public ResponseEntity<String> chat(@RequestParam("prompt") String prompt) {

    	 ChatGPTRequest request = new ChatGPTRequest(model, prompt);
         ChatGptResponse chatGptResponse = restTemplate.postForObject(apiURL, request, ChatGptResponse.class);
         String responseContent = chatGptResponse.getChoices().get(0).getMessage().getContent();
         return ResponseEntity.ok(responseContent);
    	
    	//        try {
//           
//        } catch (HttpClientErrorException.TooManyRequests e) {
//            throw e;
//        } catch (Exception e) {
//            throw e;
//        }
    }
}
