import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Badge, Button, Spin, message } from 'antd';
import { 
  TeamOutlined, 
  ShopOutlined, 
  DollarOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

function OwnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalTurfs: 0,
    totalBookings: 0,
    totalEarnings: 0,
    totalUsers: 0,
    recentBookings: [],
    userTurfs: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/dashboard/ownerdashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        message.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Table columns for recent bookings
  const bookingColumns = [
    { 
      title: 'User Name', 
      dataIndex: 'userName', 
      key: 'userName' 
    },
    { 
      title: 'Turf Name', 
      dataIndex: 'turfName', 
      key: 'turfName' 
    },
    { 
      title: 'Date', 
      dataIndex: 'bookingDate', 
      key: 'bookingDate' 
    },
    { 
      title: 'Time', 
      dataIndex: 'bookingTime', 
      key: 'bookingTime' 
    },
    { 
      title: 'Status', 
      key: 'status',
      render: (_, record) => (
        <Badge 
          status={record.status === 'confirmed' ? 'success' : 'processing'} 
          text={record.status} 
        />
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount}`
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <card className="text-center hover:shadow-lg transition p-2 bg-red-50 border-2 border-red-200 rounded-lg">
          <TeamOutlined className="text-2xl mb-2 text-blue-500 "/>
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">{dashboardData.totalUsers}</p>
        </card>
        
        <card className="text-center hover:shadow-lg transition p-2 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <ShopOutlined className="text-2xl mb-2 text-green-500" />
          <h3 className="text-gray-500">Total Turfs</h3>
          <p className="text-2xl font-bold">{dashboardData.totalTurfs}</p>
        </card>
        
        <card className="text-center hover:shadow-lg transition p-2 bg-green-50 border-2 border-green-200 rounded-lg">
          <DollarOutlined className="text-2xl mb-2 text-purple-500" />
          <h3 className="text-gray-500">Total Earnings</h3>
          <p className="text-2xl font-bold">₹{dashboardData.totalEarnings}</p>
        </card>
        
        <card className="text-center hover:shadow-lg transition p-2 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <CalendarOutlined className="text-2xl mb-2 text-orange-500" />
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold">{dashboardData.totalBookings}</p>
        </card>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      </div>
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-blue-50 border-2 border-blue-200 rounded-lg mb-5 ">
          <card title="Recent Bookings">
            <Table 
              columns={bookingColumns} 
              dataSource={dashboardData.recentBookings || []}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              size="small"
            />
          </card>
        </div>

        {/* Your Turfs */}
        <div className=''>
          <card title="Your Turfs  ">
            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 rounded-lg">
              {dashboardData.userTurfs?.map(turf => (
                <div key={turf.id} className="rounded-lg p-10 hover:bg-purple-200 transition duration-300 bg-purple-100 shadow-lg border-2 border-purple-300">
                  <h4 className="font-semibold">{turf.name}</h4>
                  <p className="text-gray-600">Location: {turf.location}</p>
                  <p className="text-gray-600">Price: ₹{turf.price}/hr</p>
                  <div className="mt-2">
                    <button type="link" size="small" className="p-0 mr-2 text-blue-600 hover:text-blue-500">Edit</button>
                    <button type="link" size="small" className="p-0 text-blue-600 hover:text-blue-500">View Bookings</button>
                  </div>
                </div>
              ))}
            </div>
          </card>
        </div>
      </div>
    
  );
}

export default OwnerDashboard;
