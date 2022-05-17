package br.com.azi.projeto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@EnableDiscoveryClient
@SpringBootApplication(scanBasePackages = "br.com.azi")
public class ProjetoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjetoApiApplication.class, args);
	}

}
