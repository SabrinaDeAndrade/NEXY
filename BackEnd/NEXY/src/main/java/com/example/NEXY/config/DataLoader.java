package com.example.NEXY.config;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injeta o codificador de senhas

    // Injeta os valores do application.properties
    @Value("${admin.master.email}")
    private String adminEmail;

    @Value("${admin.master.senha}")
    private String adminSenha;

    @Value("${admin.master.nome}")
    private String adminNome;


    @Override
    public void run(String... args) throws Exception {
        if (clienteRepository.findByEmail(adminEmail).isEmpty()) {

            System.out.println(">>> Utilizador admin master não encontrado. A criar...");

            // Cria o novo cliente administrador
            Cliente adminMaster = new Cliente();
            adminMaster.setNome(adminNome);
            adminMaster.setEmail(adminEmail);
            // ENCRIPTA a senha antes de guardar
            adminMaster.setSenha(passwordEncoder.encode(adminSenha));
            adminMaster.setTipoUsuario("ADMIN");


            clienteRepository.save(adminMaster);

            System.out.println(">>> Utilizador admin master criado com sucesso!");
            System.out.println(">>> Email: " + adminEmail);
            System.out.println(">>> Senha: " + adminSenha + " (Lembre-se desta senha!)");

        } else {
            System.out.println(">>> Utilizador admin master já existe. Nenhuma ação necessária.");
        }
    }
}