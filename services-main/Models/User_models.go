package models

type User struct {
	ID        uint   `gorm:"primary_key" json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Role      string `json:"role" default:"user"`
}

func (u *User) TableName() string {
	return "users"
}
