package main

import (
	"database/sql"
	"log"

	"github.com/Oppir07/BuildDEO-APP/api"
	db "github.com/Oppir07/BuildDEO-APP/db/sqlc"
	"github.com/Oppir07/BuildDEO-APP/util"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config", err)
	}

	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	store := db.NewStore(conn)

	server, err := api.NewServer(config, store)
	if err != nil {
		log.Fatal("cannot create server: ", err)
	}

	err = server.TestStart(config.ServerAddress)

	if err != nil {
		log.Fatal("cannot start server")
	}

}
