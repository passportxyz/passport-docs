.PHONY: up
up:
	docker-compose up --build

.PHONY: in
in:
	docker exec -it gitcoin_passport_docs /bin/bash

