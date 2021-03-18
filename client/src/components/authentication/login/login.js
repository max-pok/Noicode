import { Form, Input, Button, Checkbox, Card } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import "../../../styles/login.css"

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values)
  }

  return (
    <Form name='normal_login' className='login-form input-form' initialValues={{ remember: true }} onFinish={onFinish}>
      <Card className='login-card animate__animated animate__zoomIn' bordered>
        <h4 className='display-5 text-center mb4'>Login</h4>
        <Form.Item name='email' rules={[{ required: true, message: "Please input your E-mail!" }]}>
          <Input className='input' prefix={<MailOutlined />} size='large' placeholder='E-mail' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: "Please input your Password!" }]}>
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
          <Button type='primary' htmlType='submit' className='login-form-button' size='large'>
            Login
          </Button>
        </Form.Item>
      </Card>
    </Form>
  )
}

export default Login
