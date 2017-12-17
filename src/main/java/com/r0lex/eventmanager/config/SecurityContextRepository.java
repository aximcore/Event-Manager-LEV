package com.r0lex.eventmanager.config;

import com.r0lex.eventmanager.model.database.User;
import com.r0lex.eventmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class SecurityContextRepository implements ServerSecurityContextRepository {

    @Autowired
    UserService userService;

    @Override
    public Mono<Void> save(ServerWebExchange serverWebExchange, SecurityContext securityContext) {
        return Mono.empty();
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange serverWebExchange) {
        if (!serverWebExchange.getRequest().getHeaders().containsKey("Authorization"))
            return Mono.empty();

        List<String> tokenList = serverWebExchange.getRequest().getHeaders().get("Authorization");

        if (tokenList.isEmpty())
            return Mono.empty();

        String token = serverWebExchange.getRequest().getHeaders().get("Authorization").get(0);

        User user = userService.loadUserByToken(token).block();
        if (user == null)
            return Mono.empty();

        Authentication authentication = new AnonymousAuthenticationToken("authenticated-user", user, AuthorityUtils.createAuthorityList(user.getRole()));
        authentication.setAuthenticated(true);

        return Mono.just(new SecurityContextImpl(authentication));
    }
}