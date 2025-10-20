package com.example.NEXY.util;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordGenerator implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // 1. Altere a senha aqui para a nova senha que deseja encriptar
        String senhaAEncriptar = "novaSenha123";

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String senhaEncriptada = passwordEncoder.encode(senhaAEncriptar);

        System.out.println("\n\n===============================================");
        System.out.println("           GERADOR DE SENHA BCRYPT           ");
        System.out.println("===============================================");
        System.out.println("Senha Original: " + senhaAEncriptar);
        System.out.println("Senha Encriptada (copie o valor abaixo):");
        System.out.println(senhaEncriptada);
        System.out.println("===============================================\n\n");
    }
}
