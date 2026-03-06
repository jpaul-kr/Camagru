DOCKER_DIR=./srcs/docker-compose.yml


all: make_certs
	@docker-compose -f $(DOCKER_DIR) up --build

clean: remove_certs
	@docker-compose -f $(DOCKER_DIR) down --volumes --remove-orphans

fclean: clean
	@docker system prune -af --volumes

make_certs:
	@cd ./srcs/containers/proxy/conf/certs && openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
	-subj "/C=ES/ST=Barcelona/L=Barcelona/O=Camagru/OU=42Barcelona/CN=localhost"

remove_certs:
	@rm -f ./srcs/containers/proxy/conf/certs/*.pem
 
re: clean all

.PHONY: all clean fclean re