import React, { useEffect, useState } from "react";

interface AlertProps {
  type: "primary" | "secondary" | "warning" | "danger" | "success";
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const AlertComponent: React.FC<AlertProps> = ({ type, message, onClose, autoClose = true, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type} rounded-pill alert-dismissible fade show`} role="alert">
      {message}
      <button
        type="button"
        className="btn-close custom-close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        aria-label="Close"
      >
        <i className="fas fa-xmark" />
      </button>
    </div>
  );
};

export default AlertComponent;
