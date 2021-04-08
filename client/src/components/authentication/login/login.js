import React, { useState } from "react"
import axios from "axios"
import { encrypt } from "../../../utils/crypto"
import { Form, Input, Button, Checkbox, Card, Alert } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import "./login.css"

const Login = ({ saveToken }) => {
  const loginUrl = "http://localhost:8080/auth/login"

  const [visibleAlert, setVisibleAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)

    // encrypt login information.
    const encryptedValues = encrypt({ password: values.password })
    const data = {...encryptedValues, email: values.email}

    // send encrypted login information to server.
    axios
      .post(loginUrl, data)
      .then((response) => {
        setIsLoading(false)
        saveToken(response.data.token)
      })
      .catch(() => {
        setIsLoading(false)
        setVisibleAlert(true)
      })
  }

  const handleCloseAlert = () => {
    setVisibleAlert(false)
  }

  return (
    <Form name='normal_login' className='login-form input-form' initialValues={{ remember: true }} onFinish={onFinish}>
      <Card className='login-card animate__animated animate__zoomIn' bordered>
        <h4 className='display-5 text-center mb-4'>Login</h4>

        <Form.Item>{visibleAlert && <Alert message='Incorrect username or password.' type='error' closable afterClose={handleCloseAlert} />}</Form.Item>

        <Form.Item
          name='email'
          initialValue='maxim.p9@gmail.com'
          rules={[
            { required: true, message: "Please enter your e-mail address!" },
            { type: "email", message: "Please enter a valid e-mail!", validateTrigger: ["onFinish"] },
          ]}
        >
          <Input className='input' prefix={<MailOutlined />} size='large' placeholder='E-mail' />
        </Form.Item>

        <Form.Item name='password' initialValue='123456' rules={[{ required: true, message: "Please enter your password!" }]}>
          <Input className='input' prefix={<LockOutlined />} size='large' type='password' placeholder='Password' />
        </Form.Item>

        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox className='input'>Remember</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button' size='large' loading={isLoading}>
            Login
          </Button>
        </Form.Item>
      </Card>
    </Form>
  )
}

export default Login
