package lk.ijse.hello_shoes_shop_backend.Service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lk.ijse.hello_shoes_shop_backend.Service.JWTService;
import lk.ijse.hello_shoes_shop_backend.entity.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Service
public class JWTServiceIMPL implements JWTService {
    private long accessTokenValidity = 1*60*24;

    @Value("${token.key}")
    private String jwtKey;

    @Override
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public String generateToken(UserEntity userEntity) {
        return generateToken(new HashMap<>(), userEntity);
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String userName = extractUserName(token);
        return userName.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Actual process
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        Claims allClaims = getAllClaims(token);
        return claimResolver.apply(allClaims);
    }

    private String generateToken(Map<String, Object> extractClaims, UserEntity userEntity) {
        Claims claims = Jwts.claims().setSubject(userEntity.getEmail());
        claims.put("name", userEntity.getName());
        extractClaims.put("role", userEntity.getAuthorities());

        Date tokenCreateTime = new Date();
        Date tokenValidity = new Date(tokenCreateTime.getTime() + TimeUnit.MINUTES.toMillis(accessTokenValidity));

        String token = Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(userEntity.getEmail())
                .setExpiration(tokenValidity)
                .signWith(SignatureAlgorithm.HS256, getSignKey()) // Ensure getSignKey() returns a valid Key
                .compact();
        System.out.println("Generated JWT: " + token); // Logging the generated token
        return token;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims getAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            System.err.println("Error parsing token: " + token); // Log the token causing issues
            e.printStackTrace();
            throw e;
        }
    }

    private Key getSignKey() {
        byte[] decodedKey = Decoders.BASE64.decode(jwtKey);
        System.out.println("Decoded JWT Key: " + new String(decodedKey)); // Logging the decoded key
        return Keys.hmacShaKeyFor(decodedKey);
    }

}
