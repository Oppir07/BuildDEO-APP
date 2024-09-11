MIGRATE_BIN = $(HOME)/go/bin/migrate

DB_URL = "mysql://dbo00113303:Xwd_%24331pWq@tcp(127.0.0.1:3307)/db00113303"

ssh:
	ssh -L 3307:127.0.0.1:3306 u3067231@81.169.178.128

migrateup:
	$(MIGRATE_BIN) -path db/migration -database $(DB_URL) -verbose up

migratedown:
	$(MIGRATE_BIN) -path db/migration -database $(DB_URL) -verbose down

sqlc:
	sqlc generate

test:
	go test -v -cover ./...

server:
	go run main.go

build:
	GOOS=linux GOARCH=amd64 go build -o buildeo-backend	

.PHONY: server migrateup migratedown sqlc test build