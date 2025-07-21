import React from 'react';

function Footer(): React.ReactElement {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black py-6 text-center text-gray-400 text-sm">
      © {year} 1228 Labs. All rights reserved.
    </footer>
  );
}

export default Footer; 