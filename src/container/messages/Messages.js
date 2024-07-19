import Navbar from "../../components/Layout/Navbar";
import threedots from "../../components/images/three-dots-icon.png";
import search from "../../components/images/search.png";
import people from "../../components/images/people.png";
import files from "../../components/images/files.png";
import notepad from "../../components/images/notepad.png";
import cross from "../../components/images/cross.png";
// import phone from '../../components/images/phone.png'
import iicon from "../../components/images/iicon.svg";
import paper from "../../components/images/paper.svg";
// import paperpin from '../../components/images/paperpin.svg'
// import attherate from '../../components/images/attherate.svg'
// import smiley from '../../components/images/smiley.svg'
import vthreedots from "../../components/images/vthreedots.svg";
// import AudioVisualizer from './AudioVisualizer'
// import file_example_MP3_5MG from '../../components/images/file_example_MP3_5MG.mp3'
// import AudioMessages from './AudioMessages'
// import Drawer from '@mui/material/Drawer';
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Messages = () => {
  // const audioSrc = {file_example_MP3_5MG}
  const location = useLocation();
  const logindata =
    useSelector((state) => state.login.login_data) ||
    JSON.parse(localStorage.getItem("logindata"));
  const conversationName = location.state && location.state.conversationName;
  //console.log("conversationName : ",conversationName)
  //console.log("logindata :", logindata)
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(2);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [name, setName] = useState(logindata.id);
  const [messageHistory, setMessageHistory] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [backup, setbackup] = useState([]);
  const [convouser, setConvouser] = useState("");
  //console.log("--------------",messageHistory)
  const chatid = logindata.id;
  // const { sendJsonMessage } = useWebSocket("ws://13.233.123.209:8000/4__2");

  const [conversation, setConversation] = useState(null);
  useEffect(() => {
    if (conversationName) {
      const names = [
        conversationName.hirer,
        conversationName.freelancer,
      ].sort();
      setConversation(`${names[0]}__${names[1]}`);
      setConvouser(conversationName.freelancerDetails);
      //console.log("names -------- ",names,conversation)
    }
  }, [conversationName]);
  //console.log("names -------- ",conversationName,"-----",conversation)
  // useEffect(() => {
  function chat_data(chatid) {
    axios
      .get(`https://www.api.alanced.com/chat/conversations/${chatid}`)
      .then((response) => {
        if (response.data.status === 200) {
          let Data = response.data.data;
          setConversations(Data);
          setbackup(Data);
          //console.log("conversations",conversations)
          //console.log("--------------------",response.data.data[0].name);
          if (conversationName != null) {
            for (let i = 0; i < response.data.data.length; i++) {
              //console.log("================ >",response.data.data[i].name)
              if (
                conversationName.freelancer ==
                  response.data.data[i].from_user.id ||
                conversationName.freelancer == response.data.data[i].to_user.id
              ) {
                setConvouser(
                  response.data.data[i].from_user.id != logindata.id
                    ? response.data.data[i].from_user
                    : response.data.data[i].to_user
                );
                //console.log(conversationName.freelancer,"------",response.data.data[i].from_user.id,"-----",response.data.data[i].to_user.id)
              }
            }
          }
          if (conversationName == null) {
            setConvouser(
              Data[0].from_user.id != logindata.id
                ? Data[0].from_user
                : Data[0].to_user
            );
          }
          if (conversationName == null) {
            setConversation(Data[0].name);
          }
        } else {
          //console.log(response.data.message || 'Error fetching project');
        }
      })
      .catch((err) => {
        //console.log(err.message);
      });
  }
  // }, [logindata.id]);
  useEffect(() => {
    chat_data(chatid);
  }, [logindata.id]);
  //console.log("conversations",conversations)
  // `ws://13.233.123.209:8000/${conversation}`
  const { readyState, sendJsonMessage } = useWebSocket(
    `wss://api.alanced.com:8001/${conversation}`,
    {
      onOpen: () => {
        //console.log("Connected!");
      },
      onClose: () => {
        //console.log("Disconnected!");
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        //console.log("data :",data)
        switch (data.type) {
          case "welcome_message":
            setWelcomeMessage(data.message);
            break;
          case "chat_message_echo":
            // setMessageHistory((prev) => [...prev, data.message]);
            setMessageHistory((prev) => [data.message, ...prev]);
            //console.log("message from chat_message_echo : ",messageHistory,"-------", data.message)
            break;
          case "last_50_messages":
            if (data != undefined) {
              setMessageHistory(data.messages.slice());
              setHasMoreMessages(data.has_more);
              //console.log("message from last_50_messages : ",messageHistory,"-------", data.messages)
            }

            break;
          default:
            console.error("Unknown message type!");
            break;
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  //console.log("connection status -------------- ",connectionStatus)

  function filterconvo(query) {
    if (!query) {
      chat_data(chatid);
    }
    var list = query.split(" ");
    var querys = list[1];
    //console.log("query",query.split(" "),querys)
    const filteredConversations = backup.filter((conversation) =>
      conversation.from_user.id != logindata.id
        ? conversation.from_user.first_Name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (!querys
            ? conversation.from_user.last_Name
                .toLowerCase()
                .includes(query.toLowerCase())
            : conversation.from_user.last_Name
                .toLowerCase()
                .includes(querys.toLowerCase()))
        : conversation.to_user.first_Name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (!querys
            ? conversation.to_user.last_Name
                .toLowerCase()
                .includes(query.toLowerCase())
            : conversation.to_user.last_Name
                .toLowerCase()
                .includes(querys.toLowerCase()))
    );

    // Update state with the filtered conversations
    setConversations(filteredConversations);
  }

  // useEffect(() => {
  //   // Attach scroll event listener
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     // Detach scroll event listener on component unmount
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [messageHistory, hasMoreMessages]);

  // const handleScroll = () => {
  //   // Check if the user has scrolled to the bottom
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     fetchMessages();
  //   }
  // };

  const fetchMessages = async () => {
    const apiRes = await fetch(
      `https://www.api.alanced.com/chat/messages/?conversation=${conversation}&page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (apiRes.status === 200) {
      const data = await apiRes.json();
      setHasMoreMessages(data.next !== null);
      setPage(page + 1);
      if (data.results.length > 0) {
        // for (let i = 0; i < data.results.length; i++){
        //   //console.log("iiiiiiiii",data.results[i])
        setMessageHistory((prev) => [...prev, ...data.results]);
        // }
      } else {
        setHasMoreMessages(false);
      }
      //console.log(" Message fetched ------ >", data.results)
    }
  };

  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }
  //console.log("message -------- ",message)
  // function handleChangeName(e){
  //   setName(e.target.value);
  // }

  const [time, setTime] = useState(new Date());
  //console.log("time :",time)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  function formatTimeStamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  }

  const formatDate = (dateString) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString.slice(0, 10));
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  };

  function convoname(name, user) {
    setConversation(name);
    setPage(2);
    setConvouser(user);
    //console.log("convo name : ", name)
    //console.log("convo user : ",convouser)
  }
  //console.log("convo user : ",convouser)
  // useEffect(() => {
  //   //console.log("convo name after update:", conversation);
  // }, [conversation]);
  const handleKeyDown = (e) => {
    // Check if the Enter key is pressed
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && message.length > 0) {
      // Prevent the default behavior (e.g., form submission)
      e.preventDefault();
      // Call the submit function
      handleSubmit();
    }
    if (message.trim() === "" && e.key === "Enter") {
      e.preventDefault();
      // Optionally, you can alert the user, or simply do nothing
      // alert("Please enter some text before pressing Enter.");
      return; // Exit the function
    }
    if ((e.shiftKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  function handleSubmit() {
    // setName("manoj")
    sendJsonMessage({
      type: "chat_message",
      message,
      name,
    });
    // setName("");
    setMessage("");
    fetchMessages();
    chat_data(chatid);
    //console.log("connection status -------------- ",connectionStatus)
  }

  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div class="container-sm shadow-lg rounded-lg">
        {/* <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div class="font-semibold text-2xl">GoingChat</div>
      <div class="w-1/2">
        <input
          type="text"
          name=""
          id=""
          placeholder="search IRL"
          class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
        />
      </div>
      <div
        class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
      >
        RA
      </div>
    </div> */}

        <div class="flex flex-row border-t-2 justify-between bg-white">
          <div class="flex flex-col h-[86.1vh] w-2/5 border-r-2 overflow-y-auto">
            <div class="border-b-2 py-3 px-2 flex items-center justify-between">
              <span className="float-left text-lg font-cardo font-semibold">
                Chats
              </span>
              <img className="float-right" src={threedots}></img>
            </div>
            <div class="border-b-2 py-4 px-2">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full pr-4 p-2 pl-10 text-sm text-gray-900 border border-gray-300 outline-none rounded-lg "
                  placeholder="Search"
                  onChange={(e) => filterconvo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              {conversations != null ? (
                conversations.map((convo, index) => (
                  // <>{convo.from_user.id != logindata.id ?
                  <div
                    key={index}
                    onClick={() =>
                      convoname(
                        convo.name,
                        convo.from_user.id != logindata.id
                          ? convo.from_user
                          : convo.to_user
                      )
                    }
                    class="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer hover:bg-blue-50 active:bg-blue-100"
                  >
                    <div class="w-1/4 ml-4">
                      <div className="relative">
                        <img
                          src={
                            convo.from_user.id != logindata.id
                              ? convo.from_user.images_logo ==
                                "/static/images/blank.png"
                                ? "https://www.api.alanced.com" +
                                  "/media/images/blank.png"
                                : "https://www.api.alanced.com" +
                                  convo.from_user.images_logo
                              : convo.to_user.images_logo ==
                                "/static/images/blank.png"
                              ? "https://www.api.alanced.com" +
                                "/media/images/blank.png"
                              : "https://www.api.alanced.com" +
                                convo.to_user.images_logo
                          }
                          class="object-cover h-12 w-12 rounded-full"
                          alt=""
                        />
                        <span class="bottom-0 left-8 absolute  w-3 h-3 bg-white border-[3px] border-blue-400 dark:border-gray-800 rounded-full"></span>
                      </div>
                    </div>
                    <div class="w-full">
                      <div class="text-lg text-[#031136] font-cardo w-fit font-semibold">
                        {convo.from_user.id != logindata.id ? (
                          <>
                            {convo.from_user.first_Name}{" "}
                            {convo.from_user.last_Name}
                          </>
                        ) : (
                          <>
                            {convo.to_user.first_Name} {convo.to_user.last_Name}
                          </>
                        )}
                      </div>
                      <div className="flex-row">
                        <span class="text-[#8A8A8A] text-xs float-left text-left w-full">
                          {convo.from_user.id != logindata.id ? (
                            <>{convo.from_user.category}</>
                          ) : (
                            <>{convo.to_user.category}</>
                          )}
                        </span>
                        <span class="text-[#8A8A8A] text-[10px] float-left">
                          {convo.content.length >= 45
                            ? convo.content.substring(0, 45) + "..."
                            : convo.content}
                        </span>
                      </div>
                    </div>
                  </div>
                  // : <></>}
                  // </>
                ))
              ) : (
                <></>
              )}
            </div>
            {/* <div
          class="flex flex-row py-4 px-2 items-center border-b-2"
        >
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">MERN Stack</div>
            <span class="text-gray-500">Lusi : Thanks Everyone</span>
          </div>
        </div>
        <div class="flex flex-row py-4 px-2 items-center border-b-2">
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">Javascript Indonesia</div>
            <span class="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>
        <div class="flex flex-row py-4 px-2 items-center border-b-2">
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">Javascript Indonesia</div>
            <span class="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>
        <div class="flex flex-row py-4 px-2 items-center border-b-2">
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">Javascript Indonesia</div>
            <span class="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div> */}
          </div>

          <div class="w-full flex flex-col justify-between">
            <div className="border-b-2 h-16 p-2 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 w-fit">
                  <div className="border-2 border-[#07BC00] h-3 w-3 rounded-full"></div>
                  <span className="text-[20px] font-cardo text-[#031136]">
                    {convouser.first_Name} {convouser.last_Name}
                  </span>
                </div>
                <span className="text-[12px] text-[#8A8A8A] float-left ml-5">
                  {/* 3:06 PM EDTAlgorithm and Software Developer */}
                  {convouser.category}
                </span>
              </div>
              <div className="flex gap-2 items-center float-right">
                {/* <img className="h-[19px] w-[19px]" src={phone}/> */}
                <img
                  className="h-[25px] w-[25px] cursor-pointer"
                  src={iicon}
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className="px-2">
              <div
                id="scrollableDiv"
                class="flex flex-col-reverse h-[56vh] overflow-y-auto pr-2"
              >
                {/* <div class="flex justify-between mb-4">
          <div className="flex justify-start">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="flex-row">
            <div
              class="ml-2 py-3 px-4 text-left w-[45vw] rounded-lg text-[#0A142F]"
            >
              Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            </div>
            <span className="text-xs text-[#D7D7D7] float-left ml-6">Yesterday at 8:00 pm</span>
            </div>
            </div>
            <img className="w-fit h-fit" src={vthreedots}/>
          </div>
          <div class="flex justify-end mb-4">
            <div className="flex-row">
            <div
              class="mr-2 py-3 px-4 w-[45vw] text-left bg-[#F6FAFD] rounded-md text-[#0A142F]"
            >
              Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            </div>
            <span className="text-xs text-[#D7D7D7] float-right mr-3">Yesterday at 8:00 pm</span>
            </div>
            {/* <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            /> */}
                {/* <img className="w-fit h-fit" src={vthreedots}/>
          </div> */}
                {/* <div class="flex justify-between mb-4">
            <div className="flex justify-start">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div className="flex-row">
            <div
              class="ml-2 py-3 px-4 text-left w-[45vw] rounded-lg text-[#0A142F]"
            >
              Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            </div>
            <span className="text-xs text-[#D7D7D7] float-left ml-6">Yesterday at 8:00 pm</span>
            </div>
            </div>
            <img className="h-fit w-fit" src={vthreedots} alt=""/>
          </div> */}
                <InfiniteScroll
                  dataLength={messageHistory.length}
                  next={() => fetchMessages()}
                  hasMore={hasMoreMessages}
                  loader={<h1>Loading...</h1>}
                  inverse={true}
                  className="flex flex-col-reverse"
                  scrollableTarget="scrollableDiv"
                  endMessage={<p>no more messages...</p>}
                >
                  {messageHistory != null ? (
                    messageHistory.map((message) => (
                      <div
                        className={
                          message.from_user.id == logindata.id
                            ? "flex justify-end mb-4"
                            : "flex justify-between mb-4"
                        }
                      >
                        <div className="flex-row">
                          <div
                            class="mr-2 py-3 px-4 min:w-fit max:w-[45vw] text-left bg-[#F6FAFD] rounded-md text-[#0A142F]"
                            className={
                              message.from_user.id == logindata.id
                                ? "mr-2 py-3 px-4 min:w-fit max:w-[45vw] text-left bg-[#F6FAFD] rounded-md text-[#0A142F]"
                                : "mr-2 py-3 px-4 w-[45vw] text-left rounded-md text-[#0A142F]"
                            }
                          >
                            {/* Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  */}
                            {message.content}
                          </div>
                          <span
                            className={`text-xs text-[#D7D7D7] float-right mr-3 ${
                              message.from_user.id == logindata.id
                                ? "float-right"
                                : "float-left"
                            }`}
                          >
                            {formatDate(message.timestamp)}{" "}
                            {formatTimeStamp(message.timestamp)}
                          </span>
                        </div>
                        {/* <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            /> */}
                        <img className="w-fit h-fit" src={vthreedots} />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </InfiniteScroll>
                {/* {hasMoreMessages && <p>Loading...</p>}
      {!hasMoreMessages && <p>No more messages...</p>} */}
                <div class="flex justify-end mb-4">
                  {/* <div className="flex-row">
            <AudioMessages/>
            <span className="text-xs text-[#D7D7D7] float-right mr-3">Yesterday at 8:00 pm</span>
            </div> */}
                  {/* <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            /> */}
                  {/* <img className="w-fit h-fit mt-2 ml-2" src={vthreedots}/> */}
                </div>

                {/* <AudioVisualizer audioSrc={file_example_MP3_5MG}/> */}
                {/* <AudioMessages/> */}
                {/* <div class="flex justify-end mb-4">
            <div>
              <div
                class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Magnam, repudiandae.
              </div>

              <div
                class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, reiciendis!
              </div>
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div> */}
                {/* <div class="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
              happy holiday guys!
            </div>
          </div> */}
              </div>
              <div class="py-3 pb-1">
                {/* <input
            class="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
          /> */}
                <div className="rounded-lg border-2 border-[#E7E8F2] p-1 pb-2">
                  <textarea
                    rows="3"
                    class="block p-2.5 w-full text-sm outline-none resize-none"
                    name="message"
                    value={message}
                    required
                    maxLength={511}
                    onChange={handleChangeMessage}
                    onKeyDown={handleKeyDown}
                    placeholder="Type Message Here ..."
                  ></textarea>
                  <div className="flex justify-end gap-2 mr-2">
                    {/* <img src={smiley}/>
            <img src={attherate}/>
            <img src={paperpin}/> */}
                    <button
                      disabled={message.length === 0 ? true : false}
                      onClick={handleSubmit}
                    >
                      <img
                        className="border-l-2 border-[#D9D9D9] cursor-pointer pl-2"
                        src={paper}
                        style={{ height: "3vh", widht: "3vw" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`border-l-2 h-[86.1vh] overflow-hidden transition-all duration-500 ease-in-out ${
              isClicked ? "w-2/5" : "w-0 pl-8"
            }`}
          >
            <div
              className={`transition-opacity ease-in-out duration-300 ${
                isClicked ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                className="float-right mt-6 mr-6 cursor-pointer"
                src={cross}
                onClick={handleClick}
              />
              <div class="flex flex-col items-center w-full border-b-2">
                {/* <div class="font-semibold text-xl py-4">Mern Stack Group</div> */}
                <img
                  src={
                    convouser.images_logo == "/static/images/blank.png"
                      ? "https://www.api.alanced.com" +
                        "/media/images/blank.png"
                      : "https://www.api.alanced.com" + convouser.images_logo
                  }
                  class="object-cover rounded-full h-28 w-28 mt-12"
                  alt=""
                />
                <div class=" pt-4 text-xl font-cardo">
                  {convouser.first_Name} {convouser.last_Name}
                </div>
                <div class="text-[#797979] text-sm">
                  {/* 5:18 AM GMT+10 (4.5 h ahead) */}
                  {time.toLocaleTimeString()} IST
                </div>
                <div class="text-[#0A142F] text-xs mb-6">
                  {/* UI Designer - Complex Topics, Simple Designs */}
                  {convouser.category}
                </div>
              </div>
              <div className="pt-6 pl-6 flex flex-col items-start">
                <span className="text-lg font-cardo mb-2 ">Recent files</span>
                <div className="flex items-center py-2">
                  <img className="h-3.5 w-3.5 mr-2" src={search} />
                  <span className="text-[#8A8A8A]">Search Messages</span>
                </div>
                <div className="flex items-center py-2">
                  <img className="h-4 w-4 mr-2" src={people} />
                  <span className="text-[#8A8A8A]">People</span>
                </div>
                <div className="flex items-center py-2">
                  <img className="h-4 w-4 mr-2" src={files} />
                  <span className="text-[#8A8A8A]">Files & Links</span>
                </div>
                <div className="flex items-center py-2">
                  <img className="h-4 w-4 mr-2" src={notepad} />
                  <span className="text-[#8A8A8A]">Personal Notepad</span>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Messages;
