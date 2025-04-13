"use client";

import { useAuth } from '@/app/context/auth.context';
import { User } from '@/app/interface/IUser';
import { changeInfo, changePassword } from '@/app/repositories/user.api';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
const formatCurrency = (amount: string | undefined) => {
  if (!amount) return '0';
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const UserInfoPage: React.FC = () => {
  const Data = useAuth();
  const [user, setUser] = useState<User | null>(Data.user);
  console.log(user)
  const [depositAmount, setDepositAmount] = useState<number>(10000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };
  const ConverformatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const token = await Cookies.get("token")
    if (token) {
      const check = await changeInfo({
        displayName: formData.get('displayName') as string,
        phone: formData.get('phone') as string,
        aboutMe: formData.get('aboutMe') as string,
        dob: formatDate(formData.get('dob') as string),
        gender: formData.get('gender') as string,
      }, token)
      if (check?.error && check.error) {
        alert(check.error)
      } else {
        alert(check?.message)
        const updatedUser: User = {
          ...user,
          displayName: formData.get('displayName') as string,
          phone: formData.get('phone') as string,
          aboutMe: formData.get('aboutMe') as string,
          dob: formatDate(formData.get('dob') as string),
          gender: formData.get('gender') as string,
          // Keep existing values for these required fields
          email: user?.email as string,
          picture: user?.picture as string,
          money: user?.money as string
        };
        Data.setUser(updatedUser)
        setUser(updatedUser);
      }
    }

    alert('Profile updated successfully!');
  };

  const handleDeposit = () => {
    if (depositAmount < 10000) {
      alert('Minimum deposit amount is 10,000 VND');
      return;
    }
    window.open(
      `https://hcmutssps.id.vn/payment/createOrder?email=${user?.email}&amount=${depositAmount}`,
      '_blank'
    );
  };

  const handleChangePassword = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length <= 10) {
      alert('Password must be between 10 and 25 characters long, containing only letters and numbers, with no special characters.')
      return;
    }

    setIsPasswordLoading(true);
    try {
      const token = await Cookies.get("token")
      if (token) {
        const data = await changePassword(token, newPassword)
        if (data?.jwt) {
          Cookies.set("token", data.jwt)
          alert('Password changed successfully!');
          setIsModalOpen(false);
          setNewPassword('');
          setConfirmPassword('');
        } else {
          alert("Password must be between 10 and 25 characters long, containing only letters and numbers, with no special characters.")
        }
      }
    } catch (error) {
      alert('Failed to change password');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '16px', position: 'relative' }}>
      {/* Add Change Password button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4" />
          </svg>
          Change Password
        </button>
      </div>

      {/* Add Password Change Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <form 
            onSubmit={handleChangePassword}
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Change Password</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isPasswordLoading}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: isPasswordLoading ? '#f5f5f5' : 'white'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isPasswordLoading}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: isPasswordLoading ? '#f5f5f5' : 'white'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                disabled={isPasswordLoading}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isPasswordLoading ? 'not-allowed' : 'pointer',
                  opacity: isPasswordLoading ? 0.7 : 1
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPasswordLoading}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#52c41a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isPasswordLoading ? 'not-allowed' : 'pointer',
                  opacity: isPasswordLoading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isPasswordLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>User Profile</h1>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <Image
            src={user?.picture || "/default-avatar.png"}
            alt="User avatar"
            width={40}
            height={40}
            className="h-full object-cover"
          />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{user?.displayName}</h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Display Name</label>
            <input
              type="text"
              name="displayName"
              defaultValue={user?.displayName}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              defaultValue={user?.phone}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Balance</label>
            <input
              type="text"
              name="money"
              value={`${formatCurrency(user?.money)} VND`}
              disabled
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>About Me</label>
            <textarea
              name="aboutMe"
              defaultValue={user?.aboutMe}
              rows={4}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              defaultValue={ConverformatDate(user?.dob)}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Gender</label>
            <select
              name="gender"
              defaultValue={user?.gender}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => {
              Data.logout()
            }}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Logout
          </button>
        </form>
      </div>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '24px',
        marginTop: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Deposit Money</h2>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Amount (VND)</label>
          <input
            type="number"
            min="10000"
            step="10000"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
            Minimum deposit: 10,000 VND
          </small>
        </div>

        <button
          onClick={handleDeposit}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage;