import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Radio, Table } from 'antd';
import './serviceRequests.css'; // Custom styles

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();

  // Fetch requests from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/requests')
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error('Error fetching requests:', error));
  }, []);

  // Show and hide modal handlers
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    form.resetFields(); // Reset form after closing the modal
  };

  // Handle form submission and send new request to the backend
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        fetch('http://localhost:5000/api/requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => {
            setRequests([...requests, { ...values, id: data.id, status: 'open' }]);
            handleClose(); // Close the modal after submission
          })
          .catch((error) => console.error('Error creating request:', error));
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // Toggle request status between "open" and "closed"
  const toggleStatus = (index) => {
    const updatedRequest = requests[index];
    const newStatus = updatedRequest.status === 'open' ? 'closed' : 'open';

    // Update status on the backend
    fetch(`http://localhost:5000/api/requests/${updatedRequest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update status in the local state after backend update
        const updatedRequests = [...requests];
        updatedRequests[index] = { ...updatedRequest, status: newStatus };
        setRequests(updatedRequests);
      })
      .catch((error) => console.error('Error updating status:', error));
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Service Request',
      dataIndex: 'serviceType',
      key: 'serviceType',
    },
    {
      title: 'Client Name',
      dataIndex: 'guestName',
      key: 'guestName',
    },
    {
      title: 'Contact Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => (
        <span onClick={() => toggleStatus(index)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          {record.status === 'open' ? 'Open' : 'Closed'}
        </span>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1>SERVICE REQUESTS</h1>
      </header>

      {/* New Request Button */}
      <div className="d-flex justify-content-start mb-3">
        <Button type="primary" onClick={handleShow}>
          New Request
        </Button>
      </div>
      
      {/* Table displaying requests */}
      <Table
        dataSource={requests}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
        locale={{ emptyText: 'No Requests' }}
      />

      {/* Modal for New Request Form */}
      <Modal
        title="New Service Request"
        visible={show}
        onCancel={handleClose}
        onOk={handleSubmit}
        okText="Save"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Room Number"
            name="roomNumber"
            rules={[{ required: true, message: 'Please enter the room number' }]}
          >
            <Input placeholder="Enter room number" />
          </Form.Item>

          <Form.Item
            label="Guest Name"
            name="guestName"
            rules={[{ required: true, message: 'Please enter the guest name' }]}
          >
            <Input placeholder="Enter guest name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Service Type"
            name="serviceType"
            rules={[{ required: true, message: 'Please select a service type' }]}
          >
            <Radio.Group>
              {[
                'Room Cleaning',
                'Laundry Services',
                'Food Delivery',
                'Minibar Refill',
                'Room Upgrade',
                'Towel and Linen Replacement',
                'Wake-up Call',
                'Maintenance Request',
                'Special Request',
              ].map((service, index) => (
                <Radio key={index} value={service}>
                  {service}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceRequests;