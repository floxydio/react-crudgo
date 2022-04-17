package models

type Product struct {
	Id         uint    `json:"id" gorm:"primaryKey"`
	Name       string  `json:"name"`
	Price      float64 `json:"price"`
	UploadedBy string  `json:"uploaded_by"`
}

func (Product) TableName() string {
	return "products"
}
