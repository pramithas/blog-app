package com.pramithas.controllers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.pramithas.configuration.SecurityConfiguration;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.pramithas.repository")
@EntityScan(basePackages = "com.pramithas.models")
@Import({ SecurityConfiguration.class })
public class Application {
	public static void main(String[] args) throws Throwable {
		SpringApplication.run(Application.class, args);
	}
}
