DOCKER_DIR=./srcs/docker-compose.yml


all:
	@docker-compose -f $(DOCKER_DIR) up --build

clean:
	@docker-compose -f $(DOCKER_DIR) down --volumes --remove-orphans

fclean: clean
	@docker system prune -a -f

re: clean all

.PHONY: all clean fclean re