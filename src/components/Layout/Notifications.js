import React from "react";
import Navbar from "./Navbar";
import HomeSection4 from "./HomeSection4";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import alancedlogo from "../images/Alanced-footer.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatDateInput } from "../../container/freelancer/TimeFunctions";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [clientnotifications, setClientNotifications] = useState([]);
  const [freenotifications, setFreeNotifications] = useState([]);
  //   const token = useSelector(state => state.login.accessToken)
  const token =
    useSelector((state) => state.login.accessToken) ||
    localStorage.getItem("jwtToken");
  //   const loginType = useSelector(state => state.login.type)
  const loginType =
    useSelector((state) => state.login.type) ||
    localStorage.getItem("loginType");
  const navigate = useNavigate();

  const fetchClientNotifications = async () => {
    try {
      const response = await axios.get(
        "https://www.api.alanced.com/freelance/view/client-notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setClientNotifications(response.data.data);
      } else {
        console.log(response.data.message || "Error fetching notification");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchClientNotifications(); // Fetch notifications immediately when component mounts
    const interval = setInterval(fetchClientNotifications, 60000); // Set up interval to fetch notifications every 2 minutes

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  const markAsReadClient = async (notifId) => {
    try {
      const response = await axios.put(
        `https://www.api.alanced.com/freelance/read/client-notification/${notifId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        fetchClientNotifications(); // Fetch notifications again to reflect the changes
      } else {
        console.log(
          response.data.message || "Error marking notification as read"
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteClientNotification = async (notifId) => {
    try {
      const response = await axios.delete(
        `https://www.api.alanced.com/freelance/delete/client-notification/${notifId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        fetchClientNotifications(); // Fetch notifications again to reflect the changes
      } else {
        console.log(response.data.message || "Error deleting notification");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchFreeNotifications = async () => {
    try {
      const response = await axios.get(
        "https://www.api.alanced.com/freelance/view/freelancer-notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setFreeNotifications(response.data.data);
      } else {
        console.log(response.data.message || "Error fetching notification");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchFreeNotifications(); // Fetch notifications immediately when component mounts
    const interval = setInterval(fetchFreeNotifications, 60000); // Set up interval to fetch notifications every 2 minutes

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  const markAsReadFree = async (notifId) => {
    try {
      const response = await axios.put(
        `https://www.api.alanced.com/freelance/read/freelancer-notification/${notifId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        fetchFreeNotifications(); // Fetch notifications again to reflect the changes
      } else {
        console.log(
          response.data.message || "Error marking notification as read"
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteFreeNotification = async (notifId) => {
    try {
      const response = await axios.delete(
        `https://www.api.alanced.com/freelance/delete/freelancer-notification/${notifId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        fetchFreeNotifications(); // Fetch notifications again to reflect the changes
      } else {
        console.log(response.data.message || "Error deleting notification");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //   function formatDateInput(inputDate) {
  //     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  //     const dateObj = new Date(inputDate);
  //     const month = months[dateObj.getMonth()];
  //     const day = dateObj.getDate();
  //     const year = dateObj.getFullYear();

  //     return `${month} ${day}, ${year}`;
  //   }

  const convertToFormattedTime = (timestamp) => {
    const date = new Date(timestamp);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad minute with zero if less than 10
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  function groupByDate(notifications) {
    return notifications.reduce((acc, notif) => {
      const date = formatDateInput(notif.timestamp);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notif);
      return acc;
    }, {});
  }

  const getNotificationRedirectPath = (notif) => {
    if (notif.type === "bid") {
      return "/View-all/Job-post";
    } else if (notif.type === "AllInvite") {
      return "/view-all/invited-freelancers"; // Redirect to the invitation page
    } else if (notif.type === "AllHirereq") {
      return "/my-proposals"; // Redirect to the invitation page
    } else if (notif.type === "review") {
      return "/freelancer/edit-profile"; // Redirect to the invitation page
    } else {
      return "/notifications"; // Default redirect path
    }
  };

  //   const handleNotificationClick = (notification) => {
  //     const redirectPath = getNotificationRedirectPath(notification);
  //     navigate(redirectPath);
  //   };

  const handleClientNotificationClick = (notif) => {
    markAsReadClient(notif.id); // Mark the notification as read
    const redirectPath = getNotificationRedirectPath(notif);
    navigate(redirectPath); // Redirect to the appropriate page
  };

  const handleFreeNotificationClick = (notif) => {
    markAsReadFree(notif.id); // Mark the notification as read
    const redirectPath = getNotificationRedirectPath(notif);
    navigate(redirectPath); // Redirect to the appropriate page
  };

  return (
    <>
      <div className="mt-2 mx-[9%]">
        <h1 className="font-cardo text-[26px] text-[#031136] text-left font-normal p-3">
          Notifications
        </h1>
        <div className="bg-[#FFFFFF] border border-gray-200 border-opacity-30 text-left my-5">
          <div className="border-b border-gray-200 border-opacity-30">
            {loginType === "HIRER" &&
              (clientnotifications.length > 0 ? (
                <>
                  {Object.entries(groupByDate(clientnotifications))
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([date, notifs]) => (
                      <div key={date}>
                        <div className="text-lg font-bold p-5">{date}</div>
                        {notifs.map((notif) => (
                          <div
                            key={notif.id}
                            className={`border-b cursor-pointer p-5 hover:bg-[#F6FAFD] ${
                              !notif.is_read ? "bg-[#f4f8fc]" : "bg-white"
                            } relative group`}
                            onClick={() => handleClientNotificationClick(notif)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <img
                                  src={alancedlogo}
                                  alt=""
                                  className="h-[18px] w-[18px] mr-3"
                                />
                                <h4 className="font-bold text-md">
                                  {notif.title}
                                </h4>
                              </div>
                              <div className="flex items-center">
                                <p className="opacity-50 text-md mr-6">
                                  {convertToFormattedTime(notif.timestamp)}
                                </p>
                                <i
                                  className="bi bi-x text-[#031136] text-2xl"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteClientNotification(notif.id);
                                  }}
                                ></i>
                              </div>
                            </div>
                            <p className="opacity-50 text-md pt-1">
                              {notif.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                </>
              ) : (
                <div className="p-4">
                  <h4 className="font-bold text-md">No New Notifications</h4>
                </div>
              ))}

            {loginType === "FREELANCER" &&
              (freenotifications.length > 0 ? (
                <>
                  {Object.entries(groupByDate(freenotifications))
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([date, notifs]) => (
                      <div key={date}>
                        <div className="text-lg font-bold p-5">{date}</div>
                        {notifs.map((notif) => (
                          <div
                            key={notif.id}
                            className={`border-b cursor-pointer p-5 hover:bg-[#F6FAFD] ${
                              !notif.is_read ? "bg-[#f4f8fc]" : "bg-white"
                            } relative group`}
                            onClick={() => handleFreeNotificationClick(notif)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <img
                                  src={alancedlogo}
                                  alt=""
                                  className="h-[18px] w-[18px] mr-3"
                                />
                                <h4 className="font-bold text-md">
                                  {notif.title}
                                </h4>
                              </div>
                              <div className="flex items-center">
                                <p className="opacity-50 text-md mr-6">
                                  {convertToFormattedTime(notif.timestamp)}
                                </p>
                                <i
                                  className="bi bi-x text-[#031136] text-2xl"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFreeNotification(notif.id);
                                  }}
                                ></i>
                              </div>
                            </div>
                            <p className="opacity-50 text-md pt-1">
                              {notif.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))}
                </>
              ) : (
                <div className="p-4">
                  <h4 className="font-bold text-md">No New Notifications</h4>
                </div>
              ))}
          </div>
        </div>
      </div>
      <HomeSection4 />
      <Footer />
    </>
  );
};

export default Notifications;
