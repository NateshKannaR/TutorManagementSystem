package com.examly.springapp.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.Base64;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.Mac;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret:mySecretKey}")
    private String secret;
    
    @Value("${jwt.expiration:86400000}")
    private Long expiration;
    
    public String generateToken(String username, String role) {
        long now = System.currentTimeMillis();
        String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        String payload = "{\"sub\":\"" + username + "\",\"role\":\"" + role + "\",\"iat\":" + now + ",\"exp\":" + (now + expiration) + "}";
        
        String encodedHeader = Base64.getUrlEncoder().withoutPadding().encodeToString(header.getBytes());
        String encodedPayload = Base64.getUrlEncoder().withoutPadding().encodeToString(payload.getBytes());
        
        String signature = createSignature(encodedHeader + "." + encodedPayload);
        
        return encodedHeader + "." + encodedPayload + "." + signature;
    }
    
    public String extractUsername(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) return null;
        
        String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
        return extractFromPayload(payload, "sub");
    }
    
    public String extractRole(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) return null;
        
        String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
        return extractFromPayload(payload, "role");
    }
    
    public Boolean validateToken(String token, String username) {
        try {
            String extractedUsername = extractUsername(token);
            return extractedUsername != null && extractedUsername.equals(username) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
    
    public Boolean isTokenExpired(String token) {
        try {
            String[] parts = token.split("\\.");
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            String expStr = extractFromPayload(payload, "exp");
            long exp = Long.parseLong(expStr);
            return exp < System.currentTimeMillis();
        } catch (Exception e) {
            return true;
        }
    }
    
    private String createSignature(String data) {
        try {
            SecretKeySpec keySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(keySpec);
            byte[] signature = mac.doFinal(data.getBytes());
            return Base64.getUrlEncoder().withoutPadding().encodeToString(signature);
        } catch (Exception e) {
            return "";
        }
    }
    
    private String extractFromPayload(String payload, String key) {
        String searchKey = "\"" + key + "\":\"";
        int start = payload.indexOf(searchKey);
        if (start == -1) {
            searchKey = "\"" + key + "\":";
            start = payload.indexOf(searchKey);
            if (start == -1) return null;
            start += searchKey.length();
            int end = payload.indexOf(",", start);
            if (end == -1) end = payload.indexOf("}", start);
            return payload.substring(start, end);
        }
        start += searchKey.length();
        int end = payload.indexOf("\"", start);
        return payload.substring(start, end);
    }
}