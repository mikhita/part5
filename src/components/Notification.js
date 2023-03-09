import { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(()=>{
    if(message){
      setIsVisible(true)
      const timeout = setTimeout(()=>{
        setIsVisible(false)
      }, 5000)
      return ()=> clearTimeout(timeout)
    }
  }, [message] ) 

  if (!isVisible) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};

export default Notification;
