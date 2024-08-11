import { useEffect, useState } from 'react';

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);
	console.log("In notification");
	
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-20 right-4 bg-green-500 text-white p-3 rounded shadow-lg z-50 transition-all transform ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{ transitionDuration: '300ms' }}
    >
      {message}
    </div>
  );
};

export default Notification;
