import { useEffect, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";

const RealTimeNotifications = () => {
  const { notifications } = useSocketContext();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
        console.log(lastMessageRef);
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
}, [notifications]);

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((note, index) => (
          <li key={index} className="p-2 bg-blue-100 text-blue-800 rounded-md" ref={lastMessageRef}>
            <p>{note.message}</p>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeNotifications;
