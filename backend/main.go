package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Todo struct {
	ID uint `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
	Done bool `json:"done"`
}

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("todos.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&Todo{})

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/todos", getTodos)

	r.POST("/todos", createTodo)

	r.Run(":8080")
}

// GET /todos
func getTodos(c *gin.Context) {
	var todos []Todo
	db.Find(&todos)
	c.JSON(200, todos)
}

// POST /todos
func createTodo(c *gin.Context) {
	var todo Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	db.Create(&todo)
	c.JSON(200, todo)
}