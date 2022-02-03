import React from 'react';
import Seo from '@components/seo/seo';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';

const Profile = () => {
  return (
    <div>
      <div>
        <img loading="lazy" src="/profile/profile.png" />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Profile;
