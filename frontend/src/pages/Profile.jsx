import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          backendUrl + '/api/user/profile',
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          toast.error(response.data.message || 'Could not load profile');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, backendUrl, navigate]);

  if (!token) return null;

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="max-w-md border border-gray-200 rounded-lg p-6 sm:p-8 bg-gray-50/50">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={assets.profile_icon} alt="" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Name</p>
              <p className="text-lg font-medium text-gray-800 mt-0.5">{user.name}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Email</p>
            <p className="text-base text-gray-800 mt-0.5">{user.email}</p>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            Account details are managed from your login. For any changes, please contact support.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
