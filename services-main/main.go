package main

import (
	"context"
	"fmt"
	"net/http"
	dbInit "servicebe/Database"
	models "servicebe/Models"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

var ctx = context.Background()

func main() {
	app := fiber.New()
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	dbInit.Connect()

	app.Use(cors.New())
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Post("/register", func(c *fiber.Ctx) error {
		var userModel models.User

		if err := c.BodyParser(&userModel); err != nil {
			return err
		}
		dbInit.DB.Create(&userModel)
		return c.JSON(fiber.Map{
			"message": "Successfully Register",
			"data":    userModel,
		})
	})
	app.Post("/login", func(c *fiber.Ctx) error {
		var userModel models.User

		if err := c.BodyParser(&userModel); err != nil {
			return err
		}
		err := dbInit.DB.Where("email = ? AND password = ?", userModel.Email, userModel.Password).First(&userModel).Error
		if err != nil {
			return c.JSON(fiber.Map{
				"status":  http.StatusBadRequest,
				"message": "Invalid Email or Password",
			})
		}

		id := strconv.FormatUint(uint64(userModel.ID), 10)
		errRedis := rdb.Set(ctx, "token"+id, "23FxGHHHj1@#*(", time.Minute*10)
		if errRedis != nil {
			fmt.Println("Error when set")
		}
		return c.JSON(fiber.Map{
			"status":  http.StatusOK,
			"message": "Successfully Login",
			"data":    userModel,
			"token":   "23FxGHHHj1@#*(",
		})
	})

	app.Get("/product", func(c *fiber.Ctx) error {
		var productModel []models.Product

		dbInit.DB.Find(&productModel)
		return c.JSON(fiber.Map{
			"message": "Successfully Get Product",
			"data":    productModel,
		})
	})

	app.Post("/products", func(c *fiber.Ctx) error {
		var productModel models.Product

		if err := c.BodyParser(&productModel); err != nil {
			return err
		}
		dbInit.DB.Create(&productModel)
		return c.JSON(fiber.Map{
			"message": "Successfully Create Product",
			"data":    productModel,
		})
	})

	app.Get("/products/:id", func(c *fiber.Ctx) error {
		var productModel models.Product

		id := c.Params("id")
		dbInit.DB.Where("id = ?", id).First(&productModel)
		return c.JSON(fiber.Map{
			"message": "Successfully Get Product",
			"data":    productModel,
		})
	})

	app.Delete("/products/del/:id", func(c *fiber.Ctx) error {
		var productModel models.Product

		id := c.Params("id")
		dbInit.DB.Where("id = ?", id).Delete(&productModel)
		return c.JSON(fiber.Map{
			"message": "Successfully Delete Product",
			"data":    productModel,
		}) 
	})

	app.Listen(":2000")
}
