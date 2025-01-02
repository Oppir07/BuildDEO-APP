package util

import (
	"bytes"
	"fmt"
	"html/template"

	"gopkg.in/gomail.v2"
)

func sendGoMail(templatePath string, recipient string, token string) {
	// Get HTML template and prepare dynamic content
	var body bytes.Buffer
	t, err := template.ParseFiles(templatePath)
	if err != nil {
		fmt.Println("Error parsing template:", err)
		return
	}

	// Execute template with dynamic values
	data := struct {
		Name  string
		Token string
	}{
		Name:  "Buildeo User", // You can personalize this if needed
		Token: "123456",       // Pass the login token
	}

	err = t.Execute(&body, data)
	if err != nil {
		fmt.Println("Error executing template:", err)
		return
	}

	// Email details
	sender := "app@buildeo.de"
	password := "appOstroph$43991" // Be sure to handle this securely in production
	subject := "Login to Buildeo App"
	bodyContent := body.String()

	// Create a new email message
	m := gomail.NewMessage()
	m.SetHeader("From", sender)
	m.SetHeader("To", recipient)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", bodyContent)

	// Set up the SMTP dialer for Strato SMTP server
	d := gomail.NewDialer("smtp.strato.de", 465, sender, password)
	d.SSL = true // Enable SSL (use 465 port for SSL)

	// Send the email
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}
}
