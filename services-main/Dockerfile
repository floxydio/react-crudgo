FROM golang:1.18.1-alpine3.15
WORKDIR /go/src
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
CMD ["go", "run", "main.go"]
