package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Arrays;

@SpringBootApplication
public class SistemaEcommerceServerApplication implements CommandLineRunner {
	
	@Autowired
	private LoginRepository repoLogin;
	
	public static void main(String[] args) {
		SpringApplication.run(SistemaEcommerceServerApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception{
		
		Login usuario1 = new Login(1,"test@test.com","12345");
		Login usuario2 = new Login(2,"souto@sou.com","12345");
		Login usuario3 = new Login(3,"vaca@sou.com","123321");
		
		repoLogin.saveAll(Arrays.asList(usuario1, usuario2,usuario3));
	}
}
