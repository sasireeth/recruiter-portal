import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    const handleNotification = (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
    };

    if (socket) {
      socket.on("notification", handleNotification);
    }

    return () => {
      if (socket) {
        socket.off("notification", handleNotification);
      }
    };
  }, [socket]);
};

export default useListenMessages;
