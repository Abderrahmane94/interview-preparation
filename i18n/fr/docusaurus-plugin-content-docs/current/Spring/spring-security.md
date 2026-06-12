---
sidebar_position: 5
---
import TOCInline from '@theme/TOCInline';

# Spring Security
# <TOCInline toc={toc} />

## Qu'est-ce que Spring Security ?
Spring Security est un framework puissant et hautement personnalisable d'**authentification et d'autorisation** pour les applications Java. Il protège les API REST, les applications web et les microservices. Capacités clés :

- **Authentification** : vérifier qui vous êtes (nom d'utilisateur/mot de passe, JWT, OAuth2, LDAP).
- **Autorisation** : vérifier ce que vous pouvez faire (par rôle, au niveau méthode).
- **Protection contre les attaques courantes** : CSRF, fixation de session, clickjacking, XSS.

## Comment fonctionne Spring Security en interne ?
Spring Security utilise une **chaîne de filtres** qui intercepte chaque requête HTTP avant qu'elle n'atteigne votre contrôleur :

```
Requête → SecurityFilterChain →
  UsernamePasswordAuthenticationFilter →
  BasicAuthenticationFilter →
  ExceptionTranslationFilter →
  FilterSecurityInterceptor → Contrôleur
```

Composants clés :
- **`SecurityFilterChain`** : définit quels filtres s'appliquent à quelles URLs.
- **`AuthenticationManager`** : coordonne l'authentification via des `AuthenticationProvider`.
- **`UserDetailsService`** : charge les données utilisateur par nom d'utilisateur.
- **`SecurityContextHolder`** : contient l'`Authentication` de l'utilisateur courant (thread-local).

## Comment configurer Spring Security (façon moderne) ?

Depuis Spring Security 5.7+, `WebSecurityConfigurerAdapter` est déprécié. Utiliser des beans `SecurityFilterChain` :

```java
@Configuration
@EnableWebSecurity
public class ConfigSécurité {

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
            .csrf(csrf -> csrf.disable())  // désactiver pour les APIs sans état
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

## Comment implémenter une authentification utilisateur personnalisée ?

```java
@Service
public class ServiceUserDetails implements UserDetailsService {
    @Autowired
    private DepotUtilisateur depotUtilisateur;

    @Override
    public UserDetails loadUserByUsername(String nomUtilisateur) throws UsernameNotFoundException {
        Utilisateur utilisateur = depotUtilisateur.findByUsername(nomUtilisateur)
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + nomUtilisateur));

        return org.springframework.security.core.userdetails.User.builder()
            .username(utilisateur.getNomUtilisateur())
            .password(utilisateur.getHashMotDePasse())   // déjà haché en bcrypt
            .roles(utilisateur.getRole())
            .build();
    }
}
```

## Comment implémenter l'authentification JWT ?

JWT (JSON Web Token) est un mécanisme d'authentification sans état. Le flux :

1. L'utilisateur se connecte → le serveur valide les identifiants → retourne un JWT signé.
2. Le client stocke le JWT (en-tête, pas localStorage).
3. Le client envoie le JWT dans l'en-tête `Authorization: Bearer <token>`.
4. Le serveur valide la signature JWT et extrait les claims — pas de session nécessaire.

```java
// 1. Fournisseur JWT — génère et valide les tokens
@Component
public class FournisseurJwt {
    @Value("${jwt.secret}") private String secret;
    @Value("${jwt.expiry}") private long expiry;

    public String genererToken(UserDetails utilisateur) {
        return Jwts.builder()
            .setSubject(utilisateur.getUsername())
            .setExpiration(new Date(System.currentTimeMillis() + expiry))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .compact();
    }

    public String extraireNomUtilisateur(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(secret.getBytes()).build()
            .parseClaimsJws(token).getBody().getSubject();
    }
}

// 2. Filtre JWT — s'exécute à chaque requête
@Component
public class FiltreJwt extends OncePerRequestFilter {
    @Autowired FournisseurJwt fournisseurJwt;
    @Autowired UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String nomUtilisateur = fournisseurJwt.extraireNomUtilisateur(token);
            if (nomUtilisateur != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails utilisateur = userDetailsService.loadUserByUsername(nomUtilisateur);
                UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(utilisateur, null, utilisateur.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(req, res);
    }
}
```

## Qu'est-ce que le CSRF et quand le désactiver ?
**CSRF (Cross-Site Request Forgery)** : un attaquant trompe le navigateur d'un utilisateur connecté pour effectuer une requête non désirée.

Spring Security active la protection CSRF par défaut pour les applications web navigateur (utilise un token CSRF dans les formulaires).

**Désactiver le CSRF pour les API REST sans état** — l'authentification par JWT/token n'est pas vulnérable au CSRF car les navigateurs n'envoient pas automatiquement les tokens JWT :

```java
http.csrf(csrf -> csrf.disable()); // sûr pour les API sans état
```

Pour les applications rendues côté serveur (Thymeleaf/JSP), **garder le CSRF activé**.

## Quelle est la différence entre authentification et autorisation ?

- **Authentification** : qui êtes-vous ? — vérification de l'identité (connexion + vérification du mot de passe).
- **Autorisation** : que pouvez-vous faire ? — vérification des permissions pour une ressource.

```java
// Authentification — qui
.formLogin(login -> login.loginPage("/connexion").permitAll())

// Autorisation — quoi
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/admin/**").hasRole("ADMIN")              // basé sur le rôle
    .requestMatchers(HttpMethod.DELETE).hasAuthority("SUPPRIMER_PRIVILEGE") // basé sur la permission
    .anyRequest().authenticated()
)
```

## Qu'est-ce que la sécurité au niveau méthode ?
Sécuriser des méthodes de service individuelles avec des annotations. Nécessite `@EnableMethodSecurity` :

```java
@Configuration
@EnableMethodSecurity
public class ConfigSécurité { ... }

@Service
public class ServiceArticle {
    @PreAuthorize("hasRole('ADMIN')")
    public void supprimerArticle(Long id) { ... }

    @PreAuthorize("hasRole('USER') and #article.auteur == authentication.name")
    public void modifierArticle(Article article) { ... }

    @PostAuthorize("returnObject.auteur == authentication.name")
    public Article getArticle(Long id) { ... }
}
```

## Qu'est-ce qu'OAuth2 et comment Spring Security le supporte-t-il ?
OAuth2 est un protocole d'autorisation qui permet aux utilisateurs d'accorder à des applications tierces l'accès à leurs ressources sans partager leurs identifiants. Flux courants :

- **Authorization Code** (le plus sécurisé — pour les apps web) : l'utilisateur se connecte via un fournisseur (Google, GitHub), obtient un code d'autorisation, échangé contre un token d'accès côté serveur.
- **Client Credentials** (machine à machine) : pas d'utilisateur, le service s'authentifie avec ses propres identifiants.

```yaml
# application.yml — connexion sociale avec Google
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
// Activer la connexion OAuth2
http.oauth2Login(Customizer.withDefaults());
```

## Qu'est-ce que le `SecurityContextHolder` ?
Stocke l'`Authentication` de l'utilisateur authentifié courant dans une variable **thread-local**. Accessible partout dans le thread de la requête :

```java
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
String nomUtilisateur = auth.getName();
Collection<? extends GrantedAuthority> roles = auth.getAuthorities();
```

Après la requête, Spring Security efface automatiquement le contexte.

## Qu'est-ce que `BCryptPasswordEncoder` et pourquoi l'utiliser ?
Les mots de passe ne doivent **jamais** être stockés en clair. BCrypt est un algorithme de hachage lent et salé spécifiquement conçu pour les mots de passe :

```java
BCryptPasswordEncoder encodeur = new BCryptPasswordEncoder();
String hash = encodeur.encode("monmotdepasse");   // "$2a$10$..."
encodeur.matches("monmotdepasse", hash);          // true
```

BCrypt est lent par conception — cela rend les attaques par force brute coûteuses. Le facteur de coût (défaut 10) peut être ajusté.
