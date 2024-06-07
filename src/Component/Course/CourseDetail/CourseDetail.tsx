import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Typography, message , Drawer , Modal } from 'antd';
import { ReactComponent as Logo } from '../exImg.svg';
import './CourseDetail.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { getListExercise, getDetailCourse, deleteCourse } from '../../../inqueryFetch/classManager';
import { Course, Exercises } from '../../../Type/Exercise';
import { ReactComponent as Img1 } from './img1.svg';
import { Card, Space } from 'antd';
import { ContactsOutlined } from '@ant-design/icons';
import CreateCourse from '../CreateCourse';

const { Text } = Typography;

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [excer, setEx] = useState<Exercises[]>([]);
  const [course, setCourse] = useState<Course>()
  const [isModalOpen, setIsModalOpen] = useState(false);


  const mutation = useMutation(getListExercise, {
    onSuccess: (data) => {
      setEx(data);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const mutationCoures = useMutation(getDetailCourse, {
    onSuccess: (data) => {
      message.success('Lấy thông tin thành công');
      setCourse(data)
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const mutationDelete = useMutation( deleteCourse, {
    onSuccess: (data) => {
      message.success('Xoá khoá học thành công');
      navigate(-1)
      setCourse(data)
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Xoá khoá học không thành công');
    }
  });

  useEffect(() => {
    mutation.mutate(Number(id));
    mutationCoures.mutate(Number(id))
  }, [])
  console.log('Zoe data', course);

  const data = excer.map(item => ({
    title: item.name,
    descrition: item.description
  }));
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onDelete = () => {
    mutationDelete.mutate(Number(id))
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onDelete()
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="demo-loadmore-list">
      <Typography style={{ marginBottom: 20 }}>
        <Logo />
        <span style={{ fontSize: 20 }}>Danh sách bài tập:</span>
      </Typography>
      <div style={{ fontSize: 18, color: '#446EB1', marginBottom: 10 }} onClick={() => navigate(-1)}>
        {'<- Back'}
      </div>
      <div className="content-container">
        <div className="list-container">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.descrition}
                />
                <Button type='primary'>Delete</Button>
                <Button style={{ marginLeft: 15 }}>Edit</Button>
              </List.Item>
            )}
          />
        </div>
        <div className="image-container">
          <Space direction="vertical" size={16}>
            <Card title={<div>
              <ContactsOutlined style={{ fontSize : 20 , marginRight : 10}} />
              Thông tin lớp học
            </div>}  extra={<a onClick={showDrawer}>Chỉnh sửa</a>} style={{ width: 500 }}>
              <div>
                Tên lớp học :
              </div>
              <p style={{ fontSize : 20}}>{course?.course_name}</p>
              <div>
                Giới thiệu :
              </div>
              <p style={{ fontSize : 20}}>{course?.description}</p>
              <div>
                Mã bộ môn :
              </div>
              <p style={{ fontSize : 20}}>{course?.code}</p>
              
            </Card>
          </Space>
          <span>
            <span>
              <Button type='primary'>Tạo bài tập</Button>
            </span>
            <span>
              <Button style={{ margin: 15 }}>Danh Sach Sinh Vien</Button>
            </span>
            <span>
              <Button  type='primary' onClick={showModal}>Xoá khoá học</Button>
            </span>
          </span>
          <Img1 />
        </div>
      </div>
      <Drawer title="Chỉnh sửa khoá học : " onClose={onClose} open={open}  width={700}>
        <CreateCourse width={550} marginLeft={50} marginTop={30} course={course}/>
      </Drawer>
      <Modal title="Xác nhận việc xoá khoá học ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc chắn muốn xoá khoá học này ?</p>
      </Modal>
    </div>
  );
};

export default CourseDetail;
