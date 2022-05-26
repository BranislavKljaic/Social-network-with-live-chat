import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { DataGrid } from '@mui/x-data-grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import FilterListIcon from '@mui/icons-material/FilterList';

import {
  getUsers,
  setBlockUser,
} from '../../services/common/database-communication/firebase-api';

import { filteringOptions } from '../../shared/Helpers';

import CustomSelector from '../../components/fields/CustomSelector';

import avatarImg from '../../shared/profile-avatar.png';
import Header from '../header/Header';

import './AdminPanel.css';
import AvatarImage from '../image/AvatarImage';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    hide: true,
  },
  {
    field: 'avatarImage',
    headerName: 'Avatar Image',
    width: 70,
    renderCell: (params) => (
      <AvatarImage
        imgHeight={48}
        imgWidth={48}
        imgBorderRadius={100}
        image={params.value}
      />
    ),
  },
  {
    field: 'fullname',
    headerName: 'User full name',
    width: 270,
    renderCell: (params) => (
      <Typography
        sx={{
          fontWeight: 'bold',
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 200,
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  {
    field: 'email',
    headerName: 'User email',
    width: 270,
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  {
    field: 'registerdate',
    headerName: 'Register date',
    width: 120,
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  {
    field: 'role',
    headerName: 'User Role',
    width: 90,
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  {
    field: 'blocked',
    headerName: 'Block status',
    width: 130,
    renderCell: (params) => (
      <div>
        {params.row.role !== 'Admin' ? (
          <div>
            {params.value ? (
              <div style={{ display: 'flex' }}>
                <BlockSharpIcon sx={{ marginRight: 2, color: 'red' }} />
                <Typography className="admin-panel-blocking-user-string">
                  Unblock
                </Typography>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <BlockSharpIcon sx={{ marginRight: 2 }} />
                <Typography>Block</Typography>
              </div>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    ),
  },
];

const AdminPanel = () => {
  const [usersFromDatabase, setUsersFromDatabase] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUserBlockedState, setIsUserBlockedState] = useState(false);
  const [filterOptions, setFilterOptions] = useState(1);
  const [originalUsersListFromDatabase, setOriginalUsersListFromDatabase] =
    useState([]);

  // TODO see if useEffect need to be triggered with filterOptions also
  useEffect(async () => {
    setOriginalUsersListFromDatabase(await getUsers());
  }, [isUserBlockedState, filterOptions]);

  useEffect(() => {
    if (originalUsersListFromDatabase !== undefined) {
      setUsersFromDatabase(
        originalUsersListFromDatabase.map((oneUserDemo) => ({
          id: oneUserDemo.id,
          avatarImage: avatarImg,
          fullname: `${oneUserDemo.firstname} ${oneUserDemo.lastname}`,
          username: `@${oneUserDemo.username}`,
          email: oneUserDemo.email,
          registerdate: moment(oneUserDemo.registerdate.toDate()).format('l'),
          role: oneUserDemo.role,
          blocked: oneUserDemo.blocked,
        })),
      );
    }
  }, [originalUsersListFromDatabase]);

  useEffect(() => {
    switch (filterOptions) {
      case 1:
        setUsers(usersFromDatabase);
        break;
      case 2:
        setUsers(
          usersFromDatabase.filter(
            (user) => user.blocked && user.role !== 'Admin',
          ),
        );
        break;
      case 3:
        setUsers(usersFromDatabase.filter((user) => user.role === 'User'));
        break;
      default:
        setUsers([]);
    }
  }, [usersFromDatabase]);

  const filteringUsers = (filterOption) => {
    setFilterOptions(filterOption);
  };

  const blockUserHandler = async (isBlocked, id) => {
    await setBlockUser(isBlocked, id);

    if (!isUserBlockedState) setIsUserBlockedState(true);
    else setIsUserBlockedState(false);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <div className="admin-panel-users">
          <div className="admin-panel-users-information">
            <div className="admin-panel-greeting-message">
              <div style={{ display: 'flex' }}>
                <div className="admin-panel-greeting-message-message">
                  Good day,
                </div>
                <div>Admin</div>
              </div>
              <div className="filtering">
                <Typography className="filtering-users" variant="h4">
                  <CustomSelector
                    items={filteringOptions}
                    inputLabel="Filter"
                    width={120}
                    variant="standard"
                    selectorIcon={<FilterListIcon />}
                    onChange={(e) => filteringUsers(e.target.value)}
                  />
                </Typography>
              </div>
            </div>
            <Card sx={{ width: 1296 }}>
              <CardContent>
                <DataGrid
                  rows={users}
                  columns={columns}
                  autoHeight
                  hideFooter
                  headerHeight={0}
                  onSelectionModelChange={(selectedRow) => {
                    const selectedRowIdData = users.filter(
                      (row) => row.id === selectedRow[0],
                    );
                    if (selectedRowIdData[0].role !== 'Admin')
                      blockUserHandler(
                        selectedRowIdData[0].blocked,
                        selectedRowIdData[0].id,
                      );
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
