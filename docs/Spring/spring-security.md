---
sidebar_position: 5
---
import TOCInline from '@theme/TOCInline';

# Spring Security
# <TOCInline toc={toc} />

## What is Spring Security?
Spring Security is a powerful, highly customizable **authentication and authorization** framework for Java applications. It protects REST APIs, web apps, and microservices. Key capabilities:

- **Authentication**: verifying who you are (username/password, JWT, OAuth2, LDAP).
- **Authorization**: verifying what you can do (role-based, method-level).
- **Protection against common attacks**: CSRF, session fixation, clickjacking, XSS.

## How does Spring Security work internally?
Spring Security uses a **Filter Chain** that intercepts every HTTP request before it reaches your controller:

```
Request → SecurityFilterChain →
  UsernamePasswordAuthenticationFilter →
  BasicAuthenticationFilter →
  ExceptionTranslationFilter →
  FilterSecurityInterceptor → Controller
```

Key components:
- **`SecurityFilterChain`**: defines which filters apply to which URLs.
- **`AuthenticationManager`**: coordinates authentication via `AuthenticationProvider`s.
- **`UserDetailsService`**: loads user data by username.
- **`SecurityContextHolder`**: holds the `Authentication` of the current user (thread-local).

## How do you configure Spring Security (modern way)?

Since Spring Security 5.7+, `WebSecurityConfigurerAdapter` is deprecated. Use `SecurityFilterChain` beans:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())  // disable for stateless APIs
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

## How do you implement custom user authentication?

```java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getUsername())
            .password(user.getPasswordHash())   // already bcrypt-hashed
            .roles(user.getRole())
            .build();
    }
}
```

## How do you implement JWT authentication?

JWT (JSON Web Token) is a stateless authentication mechanism. The flow:

1. User logs in → server validates credentials → returns a signed JWT.
2. Client stores JWT (header, not localStorage).
3. Client sends JWT in `Authorization: Bearer <token>` header.
4. Server validates the JWT signature and extracts claims — no session needed.

```java
// 1. JWT Provider — generates and validates tokens
@Component
public class JwtProvider {
    @Value("${jwt.secret}") private String secret;
    @Value("${jwt.expiry}") private long expiry;

    public String generateToken(UserDetails user) {
        return Jwts.builder()
            .setSubject(user.getUsername())
            .setExpiration(new Date(System.currentTimeMillis() + expiry))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(secret.getBytes()).build()
            .parseClaimsJws(token).getBody().getSubject();
    }
}

// 2. JWT Filter — runs on every request
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired JwtProvider jwtProvider;
    @Autowired UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String username = jwtProvider.extractUsername(token);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails user = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(req, res);
    }
}
```

## What is CSRF and when should you disable it?
**CSRF (Cross-Site Request Forgery)**: an attacker tricks a logged-in user's browser into making an unwanted request.

Spring Security enables CSRF protection by default for browser-based apps (uses a CSRF token in forms).

**Disable CSRF for stateless REST APIs** — JWT/token-based auth is not vulnerable to CSRF because browsers don't automatically send JWT tokens:

```java
http.csrf(csrf -> csrf.disable()); // safe for stateless APIs
```

For traditional server-rendered apps (Thymeleaf/JSP), **keep CSRF enabled**.

## What is the difference between authentication and authorization?

- **Authentication**: who are you? — verifying identity (login + password check).
- **Authorization**: what can you do? — checking permissions for a resource.

```java
// Authentication — who
.formLogin(login -> login.loginPage("/login").permitAll())

// Authorization — what
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/admin/**").hasRole("ADMIN")       // role-based
    .requestMatchers(HttpMethod.DELETE).hasAuthority("DELETE_PRIVILEGE") // permission-based
    .anyRequest().authenticated()
)
```

## What is method-level security?
Secure individual service methods using annotations. Requires `@EnableMethodSecurity`:

```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig { ... }

@Service
public class ArticleService {
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteArticle(Long id) { ... }

    @PreAuthorize("hasRole('USER') and #article.author == authentication.name")
    public void editArticle(Article article) { ... }

    @PostAuthorize("returnObject.author == authentication.name")
    public Article getArticle(Long id) { ... }
}
```

## What is OAuth2 and how does Spring Security support it?
OAuth2 is an authorization protocol that lets users grant third-party apps access to their resources without sharing credentials. Common flows:

- **Authorization Code** (most secure — for web apps): user logs in via provider (Google, GitHub), gets auth code, exchanged for access token server-side.
- **Client Credentials** (machine-to-machine): no user, service authenticates with its own credentials.

```yaml
# application.yml — social login with Google
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID}
            client-secret: ${GOOGLE_CLIENT_SECRET}
            scope: profile, email
```

```java
// Enable OAuth2 login
http.oauth2Login(Customizer.withDefaults());
```

## What is the `SecurityContextHolder`?
Stores the `Authentication` of the current authenticated user in a **thread-local** variable. Accessible anywhere in the request's thread:

```java
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
String username = auth.getName();
Collection<? extends GrantedAuthority> roles = auth.getAuthorities();
```

After the request, Spring Security clears the context automatically.

## What is `BCryptPasswordEncoder` and why use it?
Passwords must **never** be stored in plain text. BCrypt is a slow, salted hashing algorithm specifically designed for passwords:

```java
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
String hash = encoder.encode("mypassword");   // "$2a$10$..."
encoder.matches("mypassword", hash);          // true
```

BCrypt is slow by design — it makes brute-force attacks expensive. The cost factor (default 10) can be tuned.
