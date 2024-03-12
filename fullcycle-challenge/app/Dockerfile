FROM golang:alpine3.19 AS build
WORKDIR /app
COPY . .
RUN go build -o app.go

FROM scratch
COPY --from=build /app .
CMD ["./app.go"]