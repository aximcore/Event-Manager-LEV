package com.r0lex.eventmanager.config;

import com.r0lex.eventmanager.model.database.User;
import com.r0lex.eventmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

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
        String token = serverWebExchange.getRequest().getHeaders().get("Authorization").get(0);

        User user = userService.loadUserByToken(token).block();
        Authentication authentication = new AnonymousAuthenticationToken("authenticated-user", user, AuthorityUtils.createAuthorityList(user.getRole()));
        authentication.setAuthenticated(user == null ? false : true);

        return Mono.just(new SecurityContextImpl(authentication));
    }
}