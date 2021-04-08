import React, { useState } from "react"
import axios from "axios"
import { encrypt } from "../../../utils/crypto"
import { Form, Input, Button, Card, Alert } from "antd"
import { MailOutlined, LockOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons"
import "./register.css"

const Register = () => {
  const registerUrl = "http://localhost:8080/auth/register"

  const [visibleAlert, setVisibleAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)

    // encrypt register information.
    const encryptedValues = encrypt({ email: values.email, password: values.password })
    const data = { ...encryptedValues, firstName: values.fname, lastName: values.lname, dob: values.dob }
    // send encrypted register information to server.
    console.log(data)
    axios
      .post(registerUrl, data, null)
      .then((response) => {
        setIsLoading(false)
        console.log(response)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const handleCloseAlert = () => {
    setVisibleAlert(false)
  }

  return (
    <Form name='normal_register' className='register-form input-form' initialValues={{ remember: true }} onFinish={onFinish}>
      <Card className='register-card animate__animated animate__zoomIn' bordered>
        <h4 className='display-5 text-center mb-4'>Register</h4>

        <Form.Item>{visibleAlert && <Alert message='Incorrect username or password.' type='error' closable afterClose={handleCloseAlert} />}</Form.Item>

        <Form.Item
          name='email'
          hasFeedback
          rules={[
            { required: true, message: "Please enter your e-mail address!" },
            { type: "email", message: "Please enter a valid e-mail!", validateTrigger: ["onFinishFailed"] },
          ]}
        >
          <Input className='input' prefix={<MailOutlined />} size='large' placeholder='E-mail' />
        </Form.Item>

        <Form.Item name='password' hasFeedback rules={[{ required: true, message: "Please enter your password!" }]}>
          <Input className='input' prefix={<LockOutlined />} size='large' type='password' placeholder='Password' />
        </Form.Item>

        <Form.Item
          name='confirm-password'
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"))
              },
            }),
          ]}
        >
          <Input className='input' prefix={<LockOutlined />} size='large' type='password' placeholder='Repeat password' />
        </Form.Item>

        <Form.Item name='fname' hasFeedback rules={[{ required: true, message: "Please enter your first name!" }]}>
          <Input className='input' prefix={<UserOutlined />} size='large' type='text' placeholder='First Name' />
        </Form.Item>

        <Form.Item name='lname' hasFeedback rules={[{ required: true, message: "Please enter your last name!" }]}>
          <Input className='input' prefix={<UserOutlined />} size='large' type='text' placeholder='Last Name' />
        </Form.Item>

        <Form.Item
          name='dob'
          hasFeedback
          rules={[
            { required: true, message: "Please enter your birthdate!" },
            () => ({
              validator(_, value) {
                const date = new Date(value)
                if (!value || (date >= new Date("01/01/1960") && date <= new Date())) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("The date you entered is invalid!"))
              },
            }),
          ]}
        >
          <Input className='input' prefix={<CalendarOutlined />} size='large' type='date' placeholder='Date of Birth' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='register-form-button' size='large' loading={isLoading}>
            Register
          </Button>
        </Form.Item>
      </Card>
    </Form>
  )
}

export default Register
