package database

import (
	"fmt"

	models "servicebe/Models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(mysql.Open(fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", "root", "", "localhost", "3306", "reactcrud")), &gorm.Config{})

	if err != nil {
		fmt.Println("Not Connected")
	} else {
		fmt.Println("Connected")
	}
	DB = db

	db.AutoMigrate(models.Product{})

}
