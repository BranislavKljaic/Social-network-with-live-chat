import React from 'react';
import moment from 'moment';
import Card from '@mui/material/Card';
import EmailIcon from '@mui/icons-material/Email';
import CardContent from '@mui/material/CardContent';
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from '@mui/material/Typography';
import TodayIcon from '@mui/icons-material/Today';

import './ProfileInformation.css';

const ProfileInformation = (props) => {
  const { user } = props;

  return (
    <div className="profile-content-user-information">
      <div className="profile-content-user-contact">
        <Card sx={{ width: 450, height: 170 }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 'bold',
                display: 'flex',
                paddingBottom: 3,
              }}
              gutterBottom
            >
              <EmailIcon sx={{ paddingRight: 3 }} />
              {user.email}
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 'bold',
                display: 'flex',
                paddingBottom: 3,
              }}
              gutterBottom
            >
              <BadgeIcon sx={{ paddingRight: 3 }} />
              {user.role}
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 'bold', display: 'flex' }}
              gutterBottom
            >
              <TodayIcon sx={{ paddingRight: 3 }} />
              {moment(user.registerdate).format('l')}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="profile-content-user-statistcs">
        <Card
          sx={{
            width: 450,
            height: 170,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <CardContent>
            <div className="user-statistics">
              <div className="user-statistics-publications">
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#00b960',
                  }}
                  variant="h3"
                >
                  {user.numberOfPublications}
                </Typography>
                <Typography sx={{ color: '#00b960' }} variant="h6">
                  Publications
                </Typography>
              </div>
              <div className="user-statistics-reactions">
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#00b960',
                  }}
                  variant="h3"
                >
                  {user.numberOfReactions}
                </Typography>
                <Typography sx={{ color: '#00b960' }} variant="h6">
                  Reactions
                </Typography>
              </div>
              <div className="user-statistics-comments">
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#00b960',
                  }}
                  variant="h3"
                >
                  {user.numberOfComments}
                </Typography>
                <Typography sx={{ color: '#00b960' }} variant="h6">
                  Comments
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileInformation;
