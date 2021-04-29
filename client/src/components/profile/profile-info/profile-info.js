import React, { useState, useEffect } from 'react';
import { List, Divider, Space, Button, Input, Form } from 'antd';
import { faMapMarkerAlt, faGraduationCap, faGlobeAmericas, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './profile-info.css';

const ProfileInfo = (props) => {
  const updateUrl = 'http://localhost:8080/api/users/update';

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [information, setInformation] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const data = [
    {
      title: 'Studied at',
      description: information.studied_at || '-',
      icon: <FontAwesomeIcon icon={faGraduationCap} />,
    },
    {
      title: 'Works at',
      description: information.works_at || '-',
      icon: <FontAwesomeIcon icon={faBuilding} />,
    },
    {
      title: 'From',
      description: information.from || '-',
      icon: <FontAwesomeIcon icon={faGlobeAmericas} />,
    },
    {
      title: 'Lives in',
      description: information.lives_in || '-',
      icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
    },
    {
      title: 'GitHub',
      description: information.github || '-',
      icon: <FontAwesomeIcon icon={faGithub} />,
    },
    {
      title: 'LinkedIn',
      description: information.linkedin || '-',
      icon: <FontAwesomeIcon icon={faLinkedinIn} />,
    },
  ];

  const handleChanges = (fields) => {
    const newInformation = {};
    Object.keys(fields).forEach((field) => {
      const value = fields[field];
      if (value) {
        newInformation[field] = value;
      }
    });
    sendInformation(newInformation);
  };

  const sendInformation = (information) => {
    axios
      .post(updateUrl + `/${props.userId}`, information)
      .then((response) => {
        setIsEditing(false);
        props.sethasEditedInfo(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // checks if the profile page belongs to the logged in user.
    setIsCurrentUser(props.userId === localStorage.getItem('userId'));

    if (props.userInformation) {
      setInformation(props.userInformation);
      console.log(props.userInformation);
      props.sethasEditedInfo(false);
    }
  }, [props.userInformation]);

  return (
    <>
      <Divider orientation="center">Information</Divider>
      <Form onFinish={handleChanges}>
        {isCurrentUser && (
          <div className="text-start">
            <Space>
              <Button onClick={() => setIsEditing(!isEditing)}>{!isEditing ? 'Edit' : 'Undo'}</Button>
              {isEditing ? <Button htmlType="submit">Done</Button> : ' '}
            </Space>
          </div>
        )}
        <br />

        <List
          itemLayout="horizontal"
          bordered
          dataSource={data}
          renderItem={(item) =>
            item.description && (
              <List.Item>
                {!isEditing ? (
                  <List.Item.Meta title={item.title} description={item.description} />
                ) : (
                  <Form.Item label={item.title} name={item.title.toLowerCase().split(' ').join('_')} className="form-item">
                    <Input name={item.title.toLowerCase().split(' ').join('_')} placeholder={item.description} />
                  </Form.Item>
                )}
                {item.icon}
              </List.Item>
            )
          }
        />
      </Form>
    </>
  );
};

export default ProfileInfo;
