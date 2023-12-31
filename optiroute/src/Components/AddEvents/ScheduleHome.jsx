import React, { useState } from 'react';

const ScheduleHome = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <h1>Schedule Homepage</h1>
      <button onClick={togglePopup}>Add</button>

      {showPopup && <EventFormPopup onClose={togglePopup} />}
    </div>
  );
};

export default ScheduleHome;
